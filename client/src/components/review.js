import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChevronUpIcon, UserIcon } from '@heroicons/react/solid';

import PostReview from './postReview';
import { daoThunks } from '../app/daoSlice';
import { useParams } from 'react-router-dom';

export default function Review(props) {
  const dispatch = useDispatch();
  const { contract } = useParams();
  const userState = useSelector((state) => state.user);
  const daoReviews = useSelector((state) => state.dao.activeDao?.reviews);
  console.log(daoReviews);

  //check if user is part of the dao

  const upvote = (reviewID) => {
    dispatch(daoThunks.upvoteReview(reviewID));
  };

  return (
    <div className="border py-5 mt-4 mx-4">
      {daoReviews?.map((review) => (
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

          {review.replies?.map((reply) => (
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

      {!userState.isLoggedIn && (
        <h2 className=" flex text-gray-700 my-5 justify-center items-center">
          Connect Your Wallet to give Reviews and Replies
        </h2>
      )}

      {userState.isLoggedIn && userState.user && (
        //       <div >
        //          <form className='flex align-center mx-8' onSubmit={()=>upvote()}>

        //           <img className='rounded-full w-8 h-8' src='https://ph-avatars.imgix.net/3600866/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2'/>
        //           <textarea onChange={(e)=>setReview(e.target.value)}
        //   className="
        //   h-10
        //     form-control
        //     block
        //     px-3
        //     py-1.5
        //     w-full
        //     text-base
        //     font-normal
        //     text-gray-700
        //     bg-white bg-clip-padding
        //     border border-solid border-gray-300
        //     rounded
        //     transition
        //     ease-in-out
        //     mx-2
        //     focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        //   "
        //   id="exampleFormControlTextarea1"
        //   rows="3"
        //   placeholder="leave a review"
        // ></textarea>

        // <button type='submit' className='bg-purple-700 px-4 rounded-md mx-2'>
        //   <div>send</div>
        // </button>
        // </form>

        //        </div>
        <PostReview />
      )}
    </div>
  );
}
