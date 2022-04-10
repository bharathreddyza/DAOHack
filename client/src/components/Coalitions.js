import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowNarrowRightIcon } from '@heroicons/react/outline';

export default function Coalitions(props) {
  const { data } = props;
  //   const state = useSelector((state) => state.dao);
  console.log(data);
  return (
    <div>
      <div>
        {data.delegates.map((delegate) => (
          <div className="border p-3 bg-gray-200 lg:ml-40 m-1  rounded-md">
            <div key={delegate.id} className="flex justify-center items-center">
              <div className="flex gap-3 px-3 basis-[40%] justify-end">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://stamp.fyi/avatar/eth:0xee0e9A9519bd3138e338A748aF99D1fe1bcEAE5F?s=36"
                  alt="img"
                />
                <h1>{delegate.delegate}</h1>
              </div>
              <h1 className="px-10 basis-[20%]">
                <ArrowNarrowRightIcon className=" w-8 mx-auto"></ArrowNarrowRightIcon>
              </h1>
              <div className="flex gap-3 px-3 basis-[40%] justify-start">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://stamp.fyi/avatar/eth:0x4E6A82Ac98E87c5aCF7738Fa57b5Fd9EA14Af932?s=36"
                  alt="img"
                />
                <h1>{delegate.delegator}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
