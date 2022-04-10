import React from 'react'
import { useSelector } from 'react-redux'
export default function Coalitions(props) {
    const {data} =props
    const state = useSelector((state)=>state.dao)
    console.log(data)
  return (
    <div>
        <div>
        {data.delegates.map((delegate)=>(
            <div className='border bg-gray-300 p-2  lg:ml-40 m-1  rounded-md'>
                <div key={delegate.id} className='flex  justify-center'>
                    <img className='w-8 h-8 rounded-full' src='https://stamp.fyi/avatar/eth:0xee0e9A9519bd3138e338A748aF99D1fe1bcEAE5F?s=36'/>
                    <h1>{delegate.delegate.slice(0, 6) }... {delegate.delegate.slice(-4) }</h1>
                    <h1 className='text-xl px-5'>X</h1>
                    <img className='w-8 h-8 rounded-full' src='https://stamp.fyi/avatar/eth:0x4E6A82Ac98E87c5aCF7738Fa57b5Fd9EA14Af932?s=36'/>
                    <h1>{delegate.delegator.slice(0, 6) }... {delegate.delegator.slice(-4)}</h1>
                </div>
            </div>
        ))}

        </div>
    </div>
  )
}
