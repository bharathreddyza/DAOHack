import React from 'react';
import { useSelector } from 'react-redux';
import { UserIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
export default function TopStakeHolders() {
  const navigate = useNavigate();
  const dao = useSelector((state) => state.dao.activeDao.dao);
  return (
    <div className="my-10">
      <div className="flex align-left mx-10">
        <h1 className="text-2xl text-gray-700">Top StakeHolders</h1>
      </div>
      <div className="overflow-x-auto flex flex-nowrap mx-10  ">
        {dao.topTokenHolders.map((holder) => (
          <div
            onClick={() => navigate(`/users/${holder.contract_address}`)}
            className=" cursor-pointer hover:bg-slate-400 flex p-2 m-2 bg-gray-200 rounded-md"
            key={holder.contract_address}
          >
            <UserIcon className="w-8 h-8 p-1 bg-purple-500  rounded-full text-white" />
            <div className="text-left">
              <h1>
                {((holder.balance / holder.total_supply) * 100).toFixed(3)} %
              </h1>
              <span className="flex text-center">
                💳 {holder.contract_address.slice(0, 6)}
                ...{holder.contract_address.slice(-4)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
