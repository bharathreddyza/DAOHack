import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ProposalCard from './ProposalCard'
import VoteDummy from '../Api/voteDummy.json'

export default function Proposals() {
  const state = useSelector((state)=>state.dao.activeDao.proposals)
  return (
    <div className=' flex-1 justify-center md:mx-40'>
        <div className='flex justify-between w-1/2 mx-20 justify-center'>
            <h1 className='text-2xl font-bold'>Proposals</h1>
            <div>
                dropdown
            </div>
        </div>
      {state?.map((Proposal)=>(
          <ProposalCard key={Proposal.id} data={Proposal}/>
      ))}
  </div>
  )
}
