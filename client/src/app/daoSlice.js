import { createSlice } from '@reduxjs/toolkit';
import { uiActions, uiThunks } from './uiSlice';
import daoList from '../Api/daoList.json';

const initialState = {
  overviews: [],
  activeDao: null,
};

const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setOverviews: (state, action) => {
      const payload = action.payload;
      state.overviews = payload;
    },
    setActiveDao: (state, action) => {
      state.activeDao = action.payload;
    },
    postReview: (state, action) => {
      if (state.activeDao?.hasOwnProperty('reviews')) {
        state.activeDao.reviews = [...state.activeDao.reviews, action.payload];
      } else if (state.activeDao) {
        state.activeDao.reviews = [action.payload];
      }
    },
    upvoteDao: (state, action) => {
      if (state.activeDao?.dao?.hasOwnProperty('upvotes')) {
        state.activeDao.dao.upvotes = action.payload;
      }
    },
    upvoteReview: (state, action) => {
      const { id, upvotes } = action.payload;
      console.log(id, upvotes);
      const reqReviewIndex = state.activeDao?.reviews?.findIndex(
        (review) => review.id === id
      );
      if (reqReviewIndex !== -1) {
        state.activeDao.reviews[reqReviewIndex].upvotes = upvotes;
      }
    },
  },
});

export const daoActions = daoSlice.actions;

const getOverviews = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(
      'http://localhost:5000/api/dao/daoOverviews',
      requestOptions
    );
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const daoThunks = {
  getOverviews: () => {
    return async function (dispatch) {
      try {
        dispatch(uiActions.startLoading());
        const overviews = await getOverviews();
        if (!overviews.success) {
          throw new Error(
            overviews.message || 'Something went wrong. Please try again.'
          );
        }
        const sortedDaos = overviews.data.sort((a, b) => a.rank - b.rank);
        // const reqOptions = {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     credentials: 'include',
        //   },
        // };
        // const imageChecksProm = sortedDaos.map(async (dao) => {
        //   const res = await fetch(dao.logo_url, {
        //     headers: {
        //       'Access-Control-Allow-Origin': '*',
        //       credentials: 'include',
        //       'Content-type': 'image/webp',
        //     },
        //   });
        //   return res;
        // });
        // const imageChecks = await Promise.all(imageChecksProm);
        // console.log(imageChecks);
        // // imageChecks.forEach((status, i) => {
        // //   if (status !== 200) {
        // //     console.log(sortedDaos[i].contract_name, ' does not have an image');
        // //   }
        // // });

        dispatch(daoActions.setOverviews(sortedDaos));
        dispatch(uiActions.stopLoading());
      } catch (error) {
        console.log(error);
        dispatch(uiActions.stopLoading());
        dispatch(
          uiThunks.setError(
            error.hasOwnProperty('message')
              ? error.message
              : 'Something went wrong!'
          )
        );
      }
    };
  },

  getDaoDetails: (contract) => {
    return async function (dispatch) {
      try {
        dispatch(uiActions.startLoading());
        const res = await fetch(`http://localhost:5000/api/dao/${contract}`);
        const data = await res.json();
        if (res.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Something went wrong. Please try again.'
          );
        }
        const reqContract = daoList.find(
          (dao) => dao.contractAddress === contract
        );

        data.data.dao.description = reqContract.description;
        if (!reqContract.logoUrl.includes('covalenthq')) {
          data.data.dao.logo_url = reqContract.logoUrl;
        }

        console.log(data.data);
        dispatch(daoActions.setActiveDao(data.data));
        dispatch(uiActions.stopLoading());
      } catch (error) {
        console.log(error);
        dispatch(uiActions.stopLoading());
        dispatch(
          uiThunks.setError(
            error.hasOwnProperty('message')
              ? error.message
              : 'Something went wrong!'
          )
        );
      }
    };
  },

  postReview: (review, contract) => {
    return async function (dispatch, getState) {
      try {
        const user = getState().user.user;
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', user },
          body: JSON.stringify({ value: review }),
        };
        const res = await fetch(
          `http://localhost:5000/api/review/${contract}`,
          requestOptions
        );
        const data = await res.json();
        if (res.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Unable to post review now. please try again later.'
          );
        }

        dispatch(daoActions.postReview(data.data));
      } catch (error) {
        console.log(error);
        dispatch(
          uiThunks.setError(
            error.hasOwnProperty('message')
              ? error.message
              : 'Something went wrong!'
          )
        );
      }
    };
  },

  upvoteDao: (contract) => {
    return async function (dispatch, getState) {
      try {
        const user = getState().user.user;
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-control': 'same-origin',
            user,
          },
          body: JSON.stringify({ dao_id: contract }),
        };

        const response = await fetch(
          'http://localhost:5000/api/dao/upvote',
          requestOptions
        );
        const data = await response.json();
        if (response.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Unable to upvote. please try again.'
          );
        }

        dispatch(daoActions.upvoteDao(data.data.newVotes));
      } catch (error) {
        dispatch(
          uiThunks.setError(
            error.hasOwnProperty('message')
              ? error.message
              : 'Something went wrong!'
          )
        );
      }
    };
  },

  upvoteReview: (reviewID) => {
    return async function (dispatch, getState) {
      try {
        console.log(reviewID);
        const user = getState().user.user;
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access-control': 'same-origin',
            user,
          },
          body: JSON.stringify({ review_id: reviewID }),
        };

        const response = await fetch(
          'http://localhost:5000/api/review/upvote',
          requestOptions
        );

        const data = await response.json();
        if (response.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Unable to upvote. please try again.'
          );
        }
        console.log(data.data.newVotes);
        dispatch(
          daoActions.upvoteReview({
            id: reviewID,
            upvotes: data.data.newVotes,
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(uiActions.stopLoading());
        dispatch(
          uiThunks.setError(
            error.hasOwnProperty('message')
              ? error.message
              : 'Something went wrong!'
          )
        );
      }
    };
  },
};

export default daoSlice;
