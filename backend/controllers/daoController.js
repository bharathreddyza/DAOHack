const DaoModel = require('../models/daoModel');
const catchAsync = require('../utils/catchAsync');
const daoList = require('../utils/daoList.json');
const axios = require('axios');
const AppError = require('../utils/appError');

function checkFields(body, fields) {
  let field;
  for (let i = 0; i < fields.length; i++) {
    field = fields[i];
    if (!body.hasOwnProperty(`${field}`)) {
      return [false, field];
    }
  }
  return [true];
}

const getOverview = async (daoTickers, daoAddresses, pageSize = 100) => {
  try {
    let daos = [];

    // Fetch latest prices
    const {
      data: { data },
    } = await axios(
      `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${daoTickers.toString()}&key=${'ckey_6562db8ca22f481bb2d1ef24af0'}`
    );
    // console.log(data);
    // const { data } = await res.json();

    // Remove duplicate tickers
    daos = data.items.filter(({ contract_address }) =>
      daoAddresses.includes(contract_address)
    );

    // getTokenHolder promise
    const tokenHolderPromises = daos.map(async (dao) => {
      return await axios(
        `https://api.covalenthq.com/v1/1/tokens/${
          dao.contract_address
        }/token_holders/?quote-currency=USD&format=JSON&page-size=${pageSize}&key=${'ckey_6562db8ca22f481bb2d1ef24af0'}`
      );
      // return await res.json();
    });

    // resolve tokenHolder promise
    let tokenHoldersObj = await Promise.all(tokenHolderPromises);
    tokenHoldersObj = tokenHoldersObj.map(
      (tokenHolderItem) => tokenHolderItem.data
    );

    // add tokenHolder props to each dao in daos array
    daos = daos.map((dao) => {
      const reqTokenHolder = tokenHoldersObj.find(
        (token) =>
          token.error === false &&
          token.data.items[0].contract_address === dao.contract_address
      );
      if (!reqTokenHolder) {
        return { ...dao, tokenHoldersFound: false };
      } else {
        const firstTokenHolder = reqTokenHolder.data.items[0];
        const totalMembers = reqTokenHolder.data.pagination.total_count;
        const totalSupply =
          BigInt(firstTokenHolder.total_supply) /
          BigInt(10 ** firstTokenHolder.contract_decimals);

        const marketCap = parseFloat(totalSupply) * dao.quote_rate;

        const topTokenHolders = reqTokenHolder.data.items.slice(0, 50);
        topTokenHolders.forEach((holder) => {
          holder.value = parseInt(
            BigInt(holder.balance) / BigInt(10 ** holder.contract_decimals)
          );
        });
        const updatedAt = reqTokenHolder.data.updated_at;
        return {
          ...dao,
          treasury: marketCap,
          totalMembers,
          topTokenHolders,
          updatedAt,
        };
      }
    });
    // console.log(daos);
    return daos;
  } catch (error) {
    throw new AppError(500, error.message);
  }
};

exports.addDaosToDatabase = catchAsync(async (req, res, next) => {
  const daoTickers = [];
  const daoAddresses = [];
  daoList.forEach(({ contractTicker, contractAddress }) => {
    daoTickers.push(contractTicker);
    daoAddresses.push(contractAddress);
  });

  const daos = await getOverview(daoTickers, daoAddresses);

  const daosPromises = daos.map(async (dao) => {
    const obj = {
      id: dao.contract_address,
      ...dao,
      upvotes: 0,
      upvoteUsers: [],
      lastUpdatedAt: new Date().toISOString(),
    };
    // await DaoModel.delete
    return await DaoModel.updateDao(obj);
  });

  const daosResponse = await Promise.all(daosPromises);
  // console.log(daosResponse);

  res.status(200).json({
    success: true,
    data: daosResponse,
  });
});

exports.calcTreasuryOvertimeAll = catchAsync(async (req, res, next) => {
  // try {
  const newDaos = [];
  for (let i = 0; i < daoList.length; i++) {
    try {
      const contract = daoList[i].contractAddress;
      const date = new Date();
      const curYear = date.getFullYear();
      const month = date.getMonth();
      const dates = [];
      let newDate;
      for (let i = month; i <= 11; i++) {
        newDate = new Date(curYear - 1, i, 1, 0, 0, 0, 0);
        dates.push(newDate);
      }

      for (let i = 0; i <= month; i++) {
        newDate = new Date(curYear, i, 1, 0, 0, 0, 0);
        dates.push(newDate);
      }

      // console.log(dates);
      const blockHeightsPromises = dates.map(async (startDate) => {
        const stopDate = new Date(startDate.getTime() + 60 * 1000);
        // console.log(
        //   `https://api.covalenthq.com/v1/1/block_v2/${startDate.toISOString()}/${stopDate.toISOString()}/?quote-currency=USD&format=JSON&page-size=25000&page-number=&key=ckey_6562db8ca22f481bb2d1ef24af0`
        // );
        const res = await axios.get(
          `https://api.covalenthq.com/v1/1/block_v2/${startDate.toISOString()}/${stopDate.toISOString()}/?quote-currency=USD&format=JSON&page-size=25000&page-number=&key=ckey_6562db8ca22f481bb2d1ef24af0`
        );
        return res.data;
      });

      const blockHeightsRes = await Promise.all(blockHeightsPromises);
      const blockHeights = blockHeightsRes.map(
        (blockHeightObj) => blockHeightObj.data.items[0].height
      );
      // console.log(blockHeights);

      const historicalSupplyProm = blockHeights.map(async (height) => {
        const supplyPromise = await axios.get(
          `https://api.covalenthq.com/v1/1/tokens/${contract}/token_holders/?quote-currency=USD&format=JSON&page-size=1&block-height=${height}&key=ckey_6562db8ca22f481bb2d1ef24af0`
        );
        return supplyPromise.data;
      });

      const historicalSupply = await Promise.all(historicalSupplyProm);
      // console.log(dates);
      // console.log(historicalSupply);
      let contractDecimals;
      for (let i = 0; i < historicalSupply.length; i++) {
        if (historicalSupply[i].data.items[0]?.contract_decimals) {
          contractDecimals =
            historicalSupply[i].data.items[0].contract_decimals;
        }
        if (contractDecimals) {
          break;
        }
      }

      const finalSupply = historicalSupply.map((item) => {
        return item.data.items[0]?.total_supply ?? 0;
      });
      // console.log(finalSupply);
      // console.log('Historical supply', historicalSupply);

      const { contractTicker } = daoList.find(
        (el) => el.contractAddress === contract
      );

      const historicalPricesProm = await axios.get(
        `https://api.covalenthq.com/v1/pricing/historical/USD/${contractTicker}/?quote-currency=USD&format=JSON&from=${
          dates[0].toISOString().split('T')[0]
        }&to=${
          dates[dates.length - 1].toISOString().split('T')[0]
        }&prices-at-asc=true&key=ckey_6562db8ca22f481bb2d1ef24af0`
      );

      let historicalPrices = historicalPricesProm.data;
      historicalPrices = historicalPrices.data.prices;
      const finalPrices = [];
      for (let i = 0; i < dates.length; i++) {
        const priceOnDate = historicalPrices.find(
          (obj) => obj.date === new Date(dates[i]).toISOString().split('T')[0]
        );
        if (priceOnDate) {
          finalPrices.push(priceOnDate.price);
        } else {
          historicalSupply[i] = 0;
          finalPrices.push(0);
        }
      }
      // console.log('Historical prices', historicalPrices);
      // console.log(finalPrices);

      const treasuryOverTime = {};
      const treasuryDatesOrder = [];
      dates.forEach((date, ind) => {
        treasuryDatesOrder.push(date.toLocaleDateString('en-GB'));
        treasuryOverTime[`${date.toLocaleDateString('en-GB')}`] =
          finalPrices[ind] *
          parseFloat(BigInt(finalSupply[ind]) / BigInt(10 ** contractDecimals));
      });

      const treasuryObj = {
        treasuryOrder: treasuryDatesOrder,
        treasuryOverTime: treasuryOverTime,
      };
      const newDao = await DaoModel.setDaoTreasury(contract, treasuryObj);
      newDaos.push(newDao);
      console.log(i, ' done');
    } catch (error) {
      console.log(error);
      continue;
    }
  }
  return res.status(200).json({
    success: true,
    data: newDaos,
  });
  // } catch (error) {
  //   console.log(error);
  // }
});

exports.calcTreasuryOvertime = catchAsync(async (req, res, next) => {
  const { contract } = req.params;

  const date = new Date();
  const curYear = date.getFullYear();
  const month = date.getMonth();
  const dates = [];
  let newDate;
  for (let i = month; i <= 11; i++) {
    newDate = new Date(curYear - 1, i, 1, 0, 0, 0, 0);
    dates.push(newDate);
  }

  for (let i = 0; i <= month; i++) {
    newDate = new Date(curYear, i, 1, 0, 0, 0, 0);
    dates.push(newDate);
  }

  // console.log(dates);
  const blockHeightsPromises = dates.map(async (startDate) => {
    const stopDate = new Date(startDate.getTime() + 60 * 1000);
    // console.log(
    //   `https://api.covalenthq.com/v1/1/block_v2/${startDate.toISOString()}/${stopDate.toISOString()}/?quote-currency=USD&format=JSON&page-size=25000&page-number=&key=ckey_6562db8ca22f481bb2d1ef24af0`
    // );
    const res = await axios.get(
      `https://api.covalenthq.com/v1/1/block_v2/${startDate.toISOString()}/${stopDate.toISOString()}/?quote-currency=USD&format=JSON&page-size=25000&page-number=&key=ckey_6562db8ca22f481bb2d1ef24af0`
    );
    return res.data;
  });

  const blockHeightsRes = await Promise.all(blockHeightsPromises);
  const blockHeights = blockHeightsRes.map(
    (blockHeightObj) => blockHeightObj.data.items[0].height
  );
  // console.log(blockHeights);

  const historicalSupplyProm = blockHeights.map(async (height) => {
    const supplyPromise = await axios.get(
      `https://api.covalenthq.com/v1/1/tokens/${contract}/token_holders/?quote-currency=USD&format=JSON&page-size=1&block-height=${height}&key=ckey_6562db8ca22f481bb2d1ef24af0`
    );
    return supplyPromise.data;
  });

  const historicalSupply = await Promise.all(historicalSupplyProm);

  // console.log(dates);
  // console.log(historicalSupply);
  let contractDecimals;
  for (let i = 0; i < historicalSupply.length; i++) {
    if (historicalSupply[i].data.items[0]?.contract_decimals) {
      contractDecimals = historicalSupply[i].data.items[0].contract_decimals;
    }
    if (contractDecimals) {
      break;
    }
  }

  const finalSupply = historicalSupply.map((item) => {
    return item.data.items[0]?.total_supply ?? 0;
  });
  // console.log(finalSupply);
  // console.log('Historical supply', historicalSupply);

  const { contractTicker } = daoList.find(
    (el) => el.contractAddress === contract
  );

  const historicalPricesProm = await axios.get(
    `https://api.covalenthq.com/v1/pricing/historical/USD/${contractTicker}/?quote-currency=USD&format=JSON&from=${
      dates[0].toISOString().split('T')[0]
    }&to=${
      dates[dates.length - 1].toISOString().split('T')[0]
    }&prices-at-asc=true&key=ckey_6562db8ca22f481bb2d1ef24af0`
  );

  let historicalPrices = historicalPricesProm.data;
  historicalPrices = historicalPrices.data.prices;
  const finalPrices = [];
  for (let i = 0; i < dates.length; i++) {
    const priceOnDate = historicalPrices.find(
      (obj) => obj.date === new Date(dates[i]).toISOString().split('T')[0]
    );
    if (priceOnDate) {
      finalPrices.push(priceOnDate.price);
    } else {
      historicalSupply[i] = 0;
      finalPrices.push(0);
    }
  }
  // console.log('Historical prices', historicalPrices);
  // console.log(finalPrices);

  const treasuryOverTime = {};
  const treasuryDatesOrder = [];
  dates.forEach((date, ind) => {
    treasuryDatesOrder.push(date.toLocaleDateString('en-GB'));
    treasuryOverTime[`${date.toLocaleDateString('en-GB')}`] =
      finalPrices[ind] *
      parseFloat(BigInt(finalSupply[ind]) / BigInt(10 ** contractDecimals));
  });

  const treasuryObj = {
    treasuryOrder: treasuryDatesOrder,
    treasuryOverTime: treasuryOverTime,
  };
  const newDao = await DaoModel.setDaoTreasury(contract, treasuryObj);

  return res.status(200).json({
    success: true,
    data: newDao,
  });
});

exports.getDaos = catchAsync(async (req, res, next) => {
  // console.log(req.header('user'));
  const daos = await DaoModel.getAllDaos();

  return res.status(200).json({
    success: true,
    data: daos,
  });
});

exports.daoDetail = catchAsync(async (req, res, next) => {
  const { contract } = req.params;
  const dao = await DaoModel.getDaoDetails(contract);
  const reviews = await DaoModel.getDaoReviews(contract);
  const jobs = await DaoModel.getDaoJobs(contract);

  return res.status(200).json({
    success: true,
    data: { dao, reviews, jobs },
  });
});

exports.upvoteDao = catchAsync(async (req, res, next) => {
  const { body } = req;
  // console.log(body);
  let user = req.cookies.user;
  if (!user) {
    user = req.header('user');
    if (!user) {
      return next(new AppError(400, 'Please connect your wallet to upvote.'));
    }
  }

  const hasFields = checkFields(body, ['dao_id']);
  if (!hasFields[0]) {
    return next(new AppError(400, `${hasFields[1]} is a required field.`));
  }

  const newVotes = await DaoModel.upvoteDao({
    dao_id: body.dao_id,
    user,
  });

  return res.status(200).json({
    success: true,
    data: { newVotes },
  });
});
