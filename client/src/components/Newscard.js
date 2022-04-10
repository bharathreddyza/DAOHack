import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

export default function Newscard(props) {
  const navigate = useNavigate();
  const { data } = props;
  // console.log(data);
  const isMember = useSelector((state) => state.user.isMember);

  const gotoArticleHandler = () => {
    if (isMember) {
      navigate(`/news/${data.id}`);
    } else {
      if (
        window.confirm(
          'This newsletter is only available to members.\n\nBuy Membership?'
        )
      ) {
        navigate('/membership');
      }
    }
  };

  return (
    <div
      onClick={gotoArticleHandler}
      class="cursor-pointer md:p-4 rounded-md  m-2 bg-white hover:bg-slate-200"
    >
      <img class="rounded-lg w-full" src={data.banner} alt="Banner" />
      <div className="flex justify-center ">
        {data.tags.map((tag) => (
          <p class=" p-2 m-1 bg-purple-200 hover:bg-purple-100 rounded-md text-indigo-500 text-xs  font-semibold text-base mt-2">
            {tag}
          </p>
        ))}
      </div>
      <h1 class="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate">
        {data.name}
      </h1>
      <div class="max-w-full">
        <p class="text-base font-medium tracking-wide text-gray-600 mt-1 text-justify ">
          {data.description}
        </p>
      </div>
      <div class="flex justify-center items-center space-x-2 mt-20">
        {/* <img
          class="w-10 h-10 object-cover object-center rounded-full"
          src="https://randomuser.me/api/portraits/men/54.jpg"
          alt="random user"
        /> */}
        <UserIcon className="w-10 h-10 object-cover object-center rounded-full self-start"></UserIcon>
        <div className="">
          <p class="text-gray-900 font-semibold">{data.user}</p>
          <p class="text-gray-500 font-semibold text-sm">
            {new Date(data.publishedAt).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
