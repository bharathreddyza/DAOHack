const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("ethers");
 

// Ethers.js provider initialization
export const url =
  "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX";
export const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

// const provider = new ethers.providers.InfuraProvider(
//     "matic",
//     "62052ff1d12f437c9f09f2c31bd1e7a5"
//   );
//   const sf = await Framework.create({
//     networkName: "matic",
//     provider
//   });

// metamask
// const mmProvider = new ethers.providers.Web3Provider(window.ethereum);
// const mmSf = await Framework.create({
//   networkName: "matic",
//   provider: mmProvider
// });

// const signer = mmSf.createSigner({ signer: wallet });


// // load the usdcx SuperToken via the Framework
// const usdcx = sf.loadSuperToken("0xCAa7349CEA390F89641fe306D93591f87595dc1F");

// // create an approve operation
// const approveOperation = usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() });

// // execute the approve operation, passing in a signer
// const txn = await approveOperation.exec(signer);

// // wait for the transaction to be confirmed
// const receipt = await txn.wait();

// // or you can create and execute the transaction in a single line
// const approveTxn = await usdcx.approve({ receiver: "0xab...", amount: ethers.utils.parseUnits("100").toString() }).exec(signer);
// const approveTxnReceipt = await approveTxn.wait();

