import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function ProposalCard(props) {

    const navigate = useNavigate()
    const state = useSelector((state)=>state.dao.activeDao.dao)
    const {data} = props
  return (
    <div className='p-2 '>

        <div onClick={()=>navigate(`/proposal/${data.id}`)} className=' rounded-md border p-4 cursor-pointer'>
            <div className='flex justify-between'>
                <div className='flex'>
                <img className='w-8 h-8' src={state.logo_url}/>
                <h1 className='text-sm align-middle'>{state.contract_name} by <span className='text-xs'>{data.author.slice(0, 6)} ... {data.author.slice(-4)}</span> </h1>
                </div>
                <div>
                    <button className=''>
                        {data.state == "closed" ? <h1 className=' p-1 rounded-md  m-1 bg-red-600'>closed</h1> : <h1 className='bg-green-600'>open</h1>}
                    </button>
                </div>
                

            </div>
            <div className='text-left'>
                <h1 className='text-xl font-medium'>{data.title}</h1>
                <h1 className='py-4'>{data.body.slice(0,200)}...</h1>
                <h1>{Date(data.created * 1000)}</h1>
            </div>
        </div>
    </div>
  )
}
