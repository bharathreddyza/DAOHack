import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initLoad: true,
  pageLoading: 1,
  isError: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.pageLoading += 1;
    },
    stopLoading: (state) => {
      if (state.initLoad && state.pageLoading === 2) {
        state.pageLoading = 0;
        state.initLoad = false;
      } else {
        if (state.pageLoading <= 1) {
          state.pageLoading = 0;
        } else {
          state.pageLoading -= 1;
        }
      }
    },
    setError: (state, action) => {
      state.isError = action.payload.setIsError;
      state.error = action.payload.error;
    },
  },
});

export const uiActions = uiSlice.actions;

export const uiThunks = {
  setError: (message) => {
    return async function (dispatch) {
      let timeout;
      try {
        console.log('Setting Error : ', message);
        dispatch(uiActions.setError({ setIsError: true, error: message }));
        timeout = setTimeout(() => {
          console.log('Clearing Error : ', message);
          dispatch(uiActions.setError({ setIsError: false, error: null }));
        }, 3000);
      } catch (error) {
        console.log(error);
        clearTimeout(timeout);
      }
    };
  },
};

export default uiSlice;
