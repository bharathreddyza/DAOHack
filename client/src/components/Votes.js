import React from 'react'

export default function Votes(props) {
    const {data} = props
    console.log(data)
  return (
    <div>
        <div className='m-2   bg-gray-400 rounded-md mx-80'>
            <div className='border p-2'><h1>Votes</h1></div>
            {data.allVotes.votes.map((vote)=>(
                <div className='flex border justify-between' key={vote.id}>
                   <div className=''>
                   <img className='rounded-full p-1' src="https://stamp.fyi/avatar/eth:0xee0e9A9519bd3138e338A748aF99D1fe1bcEAE5F?s=36"/>
                    <h1 className='text-md align-middle'>    <span className='text-sm'>{vote.voter.slice(0, 6)} ... {vote.voter.slice(-4)}</span> </h1>
                   </div>
                    <h1>{vote.choice}</h1>
                        
                </div>
            ))}

        </div>
        
    </div>
  )
}
