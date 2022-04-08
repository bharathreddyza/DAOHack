import { useState, useEffect } from 'react';
 
import { ChevronUpIcon, UserIcon } from '@heroicons/react/solid';

import PostReview from './postReview';
 import { useParams } from 'react-router-dom';
import Dummy from '../Api/dummy2.json'
export default function Review(props) {
   const { contract } = useParams();
 

  //check if user is part of the dao
  const { data } = props;

  const upvote = (reviewID) => {
 
  };

  return (
    <div className="border mt-4 mx-4 ">
      {Dummy.map((review) => (
        <div key={review.id}>
          <div className="flex p-4">
            <UserIcon className="pt-2 w-7 self-start"></UserIcon>
            {/* <img
              className="w-8 h-8 rounded-full"
              src={review.profilePic}
              alt="User"
            /> */}
            <div className=" ml-4">
              <div className="flex">
                <h1>{review.user}</h1>
                {review.isMember ? (
                  <button className="bg-green-400 text-green-800 rounded-md ml-4 text-xs px-1">
                    Member
                  </button>
                ) : (
                  <button className="bg-red-200 text-red-400 rounded-md ml-4 text-xs px-1">
                    Not member
                  </button>
                )}
              </div>
              <div>
                <h1 className="text-left text-gray-600	">{review.value}</h1>
              </div>
              <div>
                <button
                  className="mt-2 flex  items-center"
                  onClick={() => {
                    upvote(review.id);
                  }}
                >
                  <ChevronUpIcon className="w-4 align-middle" />
                  <h1 className="text-sm"> upvote ( {review.upvotes} )</h1>
                </button>
              </div>
            </div>
          </div>

          {Dummy.replies?.map((reply) => (
            <div>
              <div className="flex p-8 pl-20">
                <img
                  className="w-8 h-8 rounded-full"
                  src={reply.profilePic}
                  alt="User"
                />
                <div className=" ml-4">
                  <div className="flex">
                    <h1>{reply.username}</h1>
                    <button className="bg-green-400 text-green-800 rounded-md ml-4 text-xs px-1">
                      member
                    </button>
                  </div>
                  <div>
                    <h1 className="text-left text-gray-600	">{reply.comment}</h1>
                  </div>
                  {/* <div>
                      <button className='mt-2 flex  items-center'>
                      <ChevronUpIcon className='w-4 align-middle'/>
                      <h1 className='text-sm'> upvote ( {reply.upvotes} )</h1>
                      </button>
                    </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      
    </div>
  );
}
