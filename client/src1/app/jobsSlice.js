import { createSlice } from '@reduxjs/toolkit';
import { uiActions, uiThunks } from './uiSlice';
import JobDummy from '../Api/jobDummy.json';
const initialState = {
  allJobs: [],
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      const jobs = action.payload;
      state.allJobs = jobs;
    },
  },
});

export const jobActions = jobsSlice.actions;

export const JobThunks = {
  getAllJobs: () => {
    return async function (dispatch) {
      try {
        dispatch(uiActions.startLoading());
        const jobsRes = await fetch(`http://localhost:5000/api/jobs/all`);
        const jobs = await jobsRes.json();
        dispatch(jobActions.setAllJobs(jobs.data));
        dispatch(uiActions.stopLoading());
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

export default jobsSlice;
