import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { blogThunks } from '../app/blogSlice';
import Loading from '../components/loading';

export default function ArticlePage() {
  const dispatch = useDispatch();
  const activeBlog = useSelector((state) => state.blog.activeBlog);
  const isLoading = useSelector((state) => state.ui.pageLoading);
  const { id } = useParams();

  useEffect(() => {
    dispatch(blogThunks.getBlogDetails(id));
  }, [dispatch, id]);

  console.log(activeBlog);

  const paragraphs = activeBlog.text?.split('\n');

  return (
    <React.Fragment>
      {isLoading && <Loading></Loading>}
      {!isLoading && (
        <main className="relative container mx-auto bg-white px-4">
          <div className="relative -mx-4 top-0 pt-[17%] overflow-hidden">
            <img
              className="absolute inset-0 object-cover object-top w-full h-full filter blur"
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y29uY2VydCUyMHBvc3RlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt=""
            />
          </div>

          <div className="mt-[-10%] w-1/2 mx-auto">
            <div className="relative pt-[56.25%] overflow-hidden rounded-2xl">
              <img
                className="w-full h-full absolute inset-0 object-cover"
                src={activeBlog.banner}
                alt=""
              />
            </div>
          </div>

          <article className="max-w-prose mx-auto py-8">
            <h1 className="text-2xl font-bold">{activeBlog.name}</h1>
            <h2 className="mt-2 text-sm text-gray-500">
              {activeBlog.user}, {activeBlog.publishedAt}
            </h2>
            <div className="flex justify-center ">
              {activeBlog.tags?.map((tag) => (
                <p className=" p-2 m-1 bg-purple-200 hover:bg-purple-100 rounded-md text-indigo-500 text-xs  font-semibold text-base mt-2">
                  {tag}
                </p>
              ))}
            </div>
            {paragraphs?.map((para, index) => (
              <p className={`mt-${index === 0 ? 8 : 4} text-left`} key={index}>
                {para}
              </p>
            ))}
          </article>
        </main>
      )}
    </React.Fragment>
  );
}
