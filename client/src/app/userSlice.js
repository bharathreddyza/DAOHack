import { createSlice } from '@reduxjs/toolkit';
import { uiActions, uiThunks } from './uiSlice';
import { ethers } from 'ethers';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

function createClient(uri) {
  const client = new ApolloClient({
    uri: `${uri}`,
    cache: new InMemoryCache(),
  });
  return client;
}

const client = createClient(
  'https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby'
);

const { Framework } = require('@superfluid-finance/sdk-core');

const initialState = {
  isLoggedIn: false,
  user: null,
  balances: [],
  isMember: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setBalances: (state, action) => {
      state.balances = action.payload;
    },
    setMember: (state, action) => {
      state.isMember = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

// export const checkIsMember = async (provider, signer) => {
//   // const sf = await Framework.create({
//   //   networkName: "kovan",
//   //   provider
//   // });
//   // const results = await sf.query.listStreams();
//   //   console.log(results)
//   //check if current stream is present
//   return true;
// };

// const getKeyPurchases = async () => {
//   // const GetUserKeysQuery = gql`
//   // query GetUserKeys($address: String!){
//   //   keyHolders(where: {address : $address}}){
//   //       keys{
//   //         id
//   //       }
//   //     }
//   // }`;
//   // const data = await client.query({
//   //   query: GetUserKeysQuery,
//   //   variables: { address: '123' },
//   // });

//   const keyPurchasesQuery = gql`
//     query KeyPurchases($lock: String!) {
//       keyPurchases(where: { lock: $lock }) {
//         id
//         purchaser
//         timestamp
//         tokenAddress
//       }
//     }
//   `;

//   const lock = '0xaFffAaF187D5f309441EEBA4195bEe1FA94F62aC';
//   const { data } = await client.query({
//     query: keyPurchasesQuery,
//     variables: { lock },
//   });
//   console.log(data);

//   return data;
// };

const checkIsMember = async (user) => {
  const isMember = gql`
    query isMember($lock: String!, $purchaser: String!) {
      keyPurchases(where: { lock: $lock, purchaser: $purchaser }) {
        id
        purchaser
        timestamp
        tokenAddress
      }
    }
  `;

  const lock = '0xaFffAaF187D5f309441EEBA4195bEe1FA94F62aC';

  const { data } = await client.query({
    query: isMember,
    variables: { lock, purchaser: `${user}` },
  });

  if (data.keyPurchases.length) {
    return true;
  }
  return false;
};

export const userThunks = {
  checkMember: () => {
    return async function (dispatch) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        // const member = await checkIsMember(provider, signer);

        // dispatch(userActions.setMember(member));
      } catch (err) {}
    };
  },
  checkExisting: () => {
    return async function (dispatch, getState) {
      try {
        const { ethereum } = window;
        // await window.ethereum.enable()

        if (!ethereum) return;
        if (!ethereum.selectedAddress) {
          throw new Error('Wallet not connected.');
        }
        // const accounts = await ethereum.request({
        //   method: 'eth_requestAccounts',
        // });
        // if (!accounts.length) {
        //   throw new Error('Wallet not connected. Please connect wallet.');
        // }

        dispatch(userActions.setUser(ethereum.selectedAddress));
        console.log('wallet connected');
        // check if user paid for blogs
        const isMember = await checkIsMember(ethereum.selectedAddress);
        if (isMember) {
          console.log('User is a member');
          dispatch(userActions.setMember(true));
        } else {
          console.log('User is not a member');
          dispatch(userActions.setMember(false));
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        //
        // const connectedContract = new ethers.Contract(
        //   process.env.REACT_APP_CONTRACT_ID,NftJson.abi,signer
        //   )
      } catch (error) {
        console.log(error);
        // dispatch(uiActions.stopLoading());
        dispatch(uiThunks.setError(error.message));
      }
    };
  },

  login: () => {
    return async function (dispatch, getState) {
      try {
        // dispatch(uiActions.startLoading());
        const state = getState();
        const uiState = state.ui;
        if (uiState.isLoggedIn && uiState.user) {
          throw new Error('You are already logged in.');
        }

        const { ethereum } = window;
        // await window.ethereum.enable()

        if (!ethereum) return;
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        dispatch(userActions.setUser(accounts[0]));

        // check if user paid for blogs
        const isMember = await checkIsMember(accounts[0]);
        if (isMember) {
          console.log('User is a member');
          dispatch(userActions.setMember(true));
        } else {
          console.log('User is not a member');
          dispatch(userActions.setMember(false));
        }

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

        ///

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send('eth_requestAccounts', []);

        const signer = provider.getSigner();

        console.log('setting cookie to ', accounts[0]);

        // await fetch(`http://localhost:5000/api/auth/login`, {
        //   body: { user: accounts[0] },
        // });

        document.cookie = `user=${accounts[0]}; path=/; same-site=None`;
        //
        // const connectedContract = new ethers.Contract(
        //   process.env.REACT_APP_CONTRACT_ID,NftJson.abi,signer
        //   )

        // dispatch(uiActions.stopLoading());
      } catch (error) {
        console.log(error);
        // dispatch(uiActions.stopLoading());
        dispatch(uiThunks.setError(error.message));
      }
    };
  },
};

export default userSlice;
