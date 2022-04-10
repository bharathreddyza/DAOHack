import { createSlice } from '@reduxjs/toolkit';
import { jobActions } from './jobsSlice';
import { uiActions, uiThunks } from './uiSlice';
import { userActions } from './userSlice';

const initialState = {
  review: '',
  success: false,
  upvote: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    postReview: (state, action) => {
      const review = action.payload;
      state.success = review;
    },
    upvoteDao: (state, action) => {
      const upvote = action.payload;
      state.upvote = upvote;
    },
  },
});

export const reviewActions = reviewSlice.actions;

const postNewReview = async (review, contract) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ review }),
  };
  const req = await fetch(
    `http://localhost:5000/api/review/${contract}`,
    requestOptions
  );
  const res = await req.json();
  // console.log(res);
  return res;
};

const upvote = async (contract) => {
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'access-control': 'same-origin',
    },
    body: JSON.stringify(contract),
  };
  await fetch('http://localhost:5000/api/review/upvote', requestOptions);
  return true;
};

export const reviewThunks = {
  postReview: (data) => {
    return async function (dispatch) {
      try {
        console.log(data);
        const post = await postNewReview(data.review, data.contract);
        if (!post.success) {
          throw new Error(
            post.message || 'Something went wrong. Please try again.'
          );
        }
        dispatch(reviewActions.postReview(post));
      } catch (error) {
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
  upvote: (contract) => {
    return async function (dispatch) {
      try {
        const upvotes = await upvote(contract);
        dispatch(reviewActions.upvoteDao(upvotes));
      } catch (error) {
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
export default reviewSlice;
