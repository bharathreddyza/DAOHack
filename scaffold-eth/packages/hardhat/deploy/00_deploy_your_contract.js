// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const host = '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6';
const cfa = '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A';
const fDAIx = '0x8c0Db915Bb69E58751cF1170ce5df0342670b4D4';


// const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
// const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
// const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");
// const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // await deploy("PutinIsABaby", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   // args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  //   waitConfirmations: 5,
  // });

  // await deploy("TradableCashflow", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   args: [ "Hello", ethers.utils.parseEther("1.5") ],
  //   log: true,
  //   waitConfirmations: 5,
  // });

  // Getting a previously deployed contract
  // const PutinIsABaby = await ethers.getContract("PutinIsABaby", deployer);
  // await PutinIsABaby.transferOwnership('0x165CD37b4C644C2921454429E7F9358d18A45e14')
  /*  await PutinIsABaby.setPurpose("Hello");
  
    To take ownership of PutinIsABaby using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await PutinIsABaby.transferOwnership(YOUR_ADDRESS_HERE);

    //const PutinIsABaby = await ethers.getContractAt('PutinIsABaby', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  // /*
  // //If you want to send value to an address from the deployer
  // const deployerWallet = ethers.provider.getSigner()
  // await deployerWallet.sendTransaction({
  //   to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  //   value: ethers.utils.parseEther("0.001")
  // })
  // */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const PutinIsABaby = await deploy("PutinIsABaby", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const PutinIsABaby = await deploy("PutinIsABaby", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: PutinIsABaby.address,
  //       contract: "contracts/PutinIsABaby.sol:PutinIsABaby",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
// module.exports.tags = ["PutinIsABaby"];
