import { createSlice } from '@reduxjs/toolkit';
import { uiActions, uiThunks } from './uiSlice';
import { ethers } from 'ethers';

const initialState = {
  isLoggedIn: false,
  user: null,
  balances: [],
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
  },
});

export const userActions = userSlice.actions;

export const userThunks = {
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
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // await provider.send('eth_requestAccounts', []);

        const signer = provider.getSigner();

        //
        // const connectedContract = new ethers.Contract(
        //   process.env.REACT_APP_CONTRACT_ID,NftJson.abi,signer
        //   )
      } catch (error) {
        console.log(error);
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
