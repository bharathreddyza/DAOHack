import { configureStore } from '@reduxjs/toolkit';
// import  setDaodata  from './data'
import { setupListeners } from '@reduxjs/toolkit/query';
import covalentSlice from './covalentSlice';
import uiSlice from './uiSlice';
import userSlice from './userSlice';
import jobsSlice from './jobsSlice';
import reviewSlice from './reviewSlice';
import daoSlice from './daoSlice';
import blogSlice from './blogSlice';
import {
  allSubgraphSliceEndpoints,
    createApiWithReactHooks,
    initializeSfApiSlice,
    // initializeSfSubgraphSlice,
     initializeSfTransactionSlice
} from "@superfluid-finance/sdk-redux";

export const { sfApi } = initializeSfApiSlice(createApiWithReactHooks);
export const { sfTransactions } = initializeSfTransactionSlice();
// export const sfSubgraph = initializeSfSubgraphSlice(createApiWithReactHooks).injectEndpoints(allSubgraphSliceEndpoints);

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    covalent: covalentSlice.reducer,
    ui: uiSlice.reducer,
    jobs: jobsSlice.reducer,
    review: reviewSlice.reducer,
    dao: daoSlice.reducer,
    blog: blogSlice.reducer,
    sfApi: sfApi.reducer,
    sfTransactions: sfTransactions.reducer,
    // sfSubgraph: sfSubgraph.reducer
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(sfApi.middleware).concat(sfSubgraph.middleware),
});

setupListeners(store.dispatch);
