import { ethers } from 'ethers';

export const connectWallet = async () => {
  const { ethereum } = window;
  // await window.ethereum.enable()

  if (!ethereum) return;
  try {
    await ethereum.request({
      method: 'eth_requestAccounts',
    });
    // .request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       chainId: '0x89',
    //       rpcUrls: ['https://rpc-mainnet.matic.network/'],
    //       chainName: 'Matic Mainnet',
    //       nativeCurrency: {
    //         name: 'MATIC',
    //         symbol: 'MATIC',
    //         decimals: 18,
    //       },
    //       blockExplorerUrls: ['https://polygonscan.com/'],
    //     },
    //   ],
    // })
    // .then(
    //   await ethereum.request({
    //     method: 'eth_requestAccounts',
    //   })
    // );
  } catch (err) {}

  ///

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  await provider.send('eth_requestAccounts', []);

  const signer = provider.getSigner();

  //
  // const connectedContract = new ethers.Contract(
  //   process.env.REACT_APP_CONTRACT_ID,NftJson.abi,signer
  //   )
};
