import daoList from './daoList';
export async function GetServerSideProps() {
  const daoTickers = [];
  const daoAddresses = [];
  daoList.forEach(({ contractTicker, contractAddress }) => {
    // daoNames.push(contractName);
    daoTickers.push(contractTicker);
    daoAddresses.push(contractAddress);
  });
  let daos = [];
  const res = await fetch(
    `https://api.covalenthq.com/v1/pricing/tickers/?tickers=${daoTickers.toString()}&key=${'ckey_6562db8ca22f481bb2d1ef24af0'}`
  );
  // const bal = await fetch(`https://api.covalenthq.com/v1/1/address/0xb72EcaA31E8642CEc5237cC01f203009b379cEe6/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_6562db8ca22f481bb2d1ef24af0`)
  // console.log(await bal.json());

  // for(let i = 0;  i < daoTickers.length; i++){
  //   const res = await fetch(`https://api.covalenthq.com/v1/pricing/historical/USD/${daoTickers[i]}/?quote-currency=USD&format=JSON&key=${'ckey_6562db8ca22f481bb2d1ef24af0'}`);

  //   const {data} = await res.json();
  //   console.log(data);
  // }
  const { data } = await res.json();
  console.log(data);

  if (!data) return { props: {} };

  // Remove duplicate tickers
  daos = data.items.filter(({ contract_address }) =>
    daoAddresses.includes(contract_address)
  );
  console.log(daos);

  return { props: { daos } };
}
