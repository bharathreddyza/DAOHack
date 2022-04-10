import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProposalCard from './ProposalCard';
import VoteDummy from '../Api/voteDummy.json';

export default function Proposals() {
  const state = useSelector((state) => state.dao.activeDao.proposals);
  return (
    <div className=" flex flex-col mt-10 md:mx-40">
      <div className="flex w-1/2 mx-2 mb-2">
        <h1 className="text-2xl font-bold">Proposals</h1>
        {/* <div>
                dropdown
            </div> */}
      </div>
      {state?.map((Proposal) => (
        <ProposalCard key={Proposal.id} data={Proposal} />
      ))}
    </div>
  );
}
