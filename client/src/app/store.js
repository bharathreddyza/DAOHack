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

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    covalent: covalentSlice.reducer,
    ui: uiSlice.reducer,
    jobs: jobsSlice.reducer,
    review: reviewSlice.reducer,
    dao: daoSlice.reducer,
    blog: blogSlice.reducer,
  },
});

setupListeners(store.dispatch);

