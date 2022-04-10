import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { blogThunks } from '../app/blogSlice';

import Newscard from '../components/Newscard';
import Loading from '../components/loading';

export default function NewsPage() {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog);
  const isLoading = useSelector((state) => state.ui.pageLoading);
  console.log(blogState);
  useEffect(() => {
    dispatch(blogThunks.getBlogs());
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {blogState.blogs.map((blog) => (
            <Newscard data={blog} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}
