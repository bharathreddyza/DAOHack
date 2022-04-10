import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { reviewThunks } from '../app/reviewSlice';
import { daoThunks } from '../app/daoSlice';

export default function PostReview() {
  const { contract } = useParams();
  const [review, setReview] = useState('');
  const dispatch = useDispatch();

  const postReview = (e) => {
    e.preventDefault();
    console.log(contract);
    dispatch(daoThunks.postReview(review, contract));
    setReview('');
  };
  return (
    <div>
      <div>
        <form
          onSubmit={(e) => postReview(e)}
          className="flex align-center mx-8"
        >
          <img
            className="rounded-full w-8 h-8"
            src="https://ph-avatars.imgix.net/3600866/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2"
            alt="Img"
          />
          <textarea
            onChange={(e) => setReview(e.target.value)}
            className="
      h-10
        form-control
        block
        px-3
        py-1.5
        w-full
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mx-2
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="leave a review"
            value={review}
          ></textarea>

          <button type="submit" className="bg-purple-700 px-4 rounded-md mx-2">
            <div>send</div>
          </button>
        </form>
      </div>
    </div>
  );
}
