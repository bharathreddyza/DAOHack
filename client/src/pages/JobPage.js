import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobThunks } from '../app/jobsSlice';

import JobBoard from '../components/jobBoard';
import Loading from '../components/loading';
export default function JobPage() {
  const dispatch = useDispatch();
  const jobState = useSelector((state) => state.jobs);
  const isLoading = useSelector((state) => state.ui.pageLoading);

  useEffect(() => {
    dispatch(JobThunks.getAllJobs());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Loading></Loading> : ''}
      {!isLoading ? (
        jobState.allJobs?.length ? (
          <JobBoard jobs={jobState.allJobs}></JobBoard>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  );
}
