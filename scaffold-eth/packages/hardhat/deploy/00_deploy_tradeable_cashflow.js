require("dotenv").config();

// mumbai addresses - change if using a different network
const host = '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6';
const cfa = '0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A';
const fDAIx = '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f';
const owner = '0x8c0Db915Bb69E58751cF1170ce5df0342670b4D4'

const deployFramework = require("@superfluid-finance/ethereum-contracts/scripts/deploy-framework");
const deployTestToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-test-token");
const deploySuperToken = require("@superfluid-finance/ethereum-contracts/scripts/deploy-super-token");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const Web3 = require("web3");
const { defaultNetwork } = require("../hardhat.config");
const config = require("../hardhat.config");

require("dotenv");
//your address here...
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);

  await deploy("TradeableCashflow", {
    from: deployer,
    args: [owner, 'nifty_billboard', 'NFTBoard', host, cfa, fDAIx],
    log: true,
  })
}
//...

module.exports.tags = ["TradeableCashflow"];