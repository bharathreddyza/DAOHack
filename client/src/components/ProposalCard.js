import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ProposalCard(props) {
  const navigate = useNavigate();
  const state = useSelector((state) => state.dao.activeDao.dao);
  const { data } = props;
  return (
    <div className="p-2 ">
      <div
        onClick={() => navigate(`/proposal/${data.id}`)}
        className=" rounded-md border p-4 cursor-pointer"
      >
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img className="w-8 h-8" src={state.logo_url} alt="Logo" />
            <h1 className="text-sm self-center text-gray-600">
              {state.contract_name} by{' '}
              <span className="text-xs">
                {data.author.slice(0, 6)} ... {data.author.slice(-4)}
              </span>{' '}
            </h1>
          </div>
          <div>
            <button className="">
              {data.state === 'closed' ? (
                <h1 className=" p-1 rounded-md  m-1 bg-red-200 text-red-400 ">
                  closed
                </h1>
              ) : (
                <h1 className="p-1 rounded-md m-1 bg-green-200 text-green-400">
                  open
                </h1>
              )}
            </button>
          </div>
        </div>
        <div className="text-left">
          <h1 className="text-xl font-medium">{data.title}</h1>
          <h1 className="pt-4 pb-2 text-gray-600">
            {data.body.slice(0, 200)}...
          </h1>
          <h1 className="text-gray-600 text-sm">{Date(data.created * 1000)}</h1>
        </div>
      </div>
    </div>
  );
}
