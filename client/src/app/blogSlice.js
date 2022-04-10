import { createSlice } from '@reduxjs/toolkit';
import { uiActions, uiThunks } from './uiSlice';

const initialState = {
  blogs: [],
  activeBlog: {},
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      const payload = action.payload;
      state.blogs = payload;
    },
    setActiveBlog: (state, action) => {
      state.activeBlog = action.payload;
    },
    upvoteBlog: (state, action) => {
      if (state.activeBlog?.hasOwnProperty('upvotes')) {
        state.activeBlog.upvotes = action.payload;
      }
    },
  },
});

export const blogActions = blogSlice.actions;

export const blogThunks = {
  getBlogs: () => {
    return async function (dispatch) {
      try {
        dispatch(uiActions.startLoading());

        const blogsRes = await fetch(`http://localhost:5000/api/blog/all`);
        const blogsData = await blogsRes.json();
        if (blogsRes.status !== 200 || !blogsData.success) {
          throw new Error(
            blogsData.message || 'Something went wrong. Please try again.'
          );
        }

        dispatch(blogActions.setBlogs(blogsData.data));
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

  getBlogDetails: (blogID) => {
    return async function (dispatch) {
      try {
        dispatch(uiActions.startLoading());
        const res = await fetch(`http://localhost:5000/api/blog/${blogID}`);
        const data = await res.json();

        if (res.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Something went wrong. Please try again.'
          );
        }

        dispatch(blogActions.setActiveBlog(data.data));
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

  upvoteBlog: (blogID) => {
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
          body: JSON.stringify({ blog_id: blogID }),
        };

        const response = await fetch(
          'http://localhost:5000/api/blog/upvote',
          requestOptions
        );

        const data = await response.json();
        if (response.status !== 200 || !data.success) {
          throw new Error(
            data.message || 'Unable to upvote. please try again.'
          );
        }

        dispatch(blogActions.upvoteBlog(data.data));
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

export default blogSlice;
