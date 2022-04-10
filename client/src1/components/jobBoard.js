import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
 

 export default function JobBoard() {
 
  // required Data
  // job name
  // amount
  // Link
  // number of winners
  // expireince
  // last date
  // job description
  //open or close
 const dummy =[
    {
  "job_description":"a decription related to UX designer requirements",
  "job_role":"UX Designer",
  "open":true,
  "value":"3"

} ,
{
  "job_description":"write an artical on our DAO",
  "job_role":"Research writing",
  "open":false,
  "value":"5"

} 
]
  return (
    <div>
      {dummy.map(job =>(
        <div key={job.value} className='card border rounded-md p-4 m-4  lg:w-1/2 '>
        <div className='justify-start'>
          <div className='flex justify-between'>
             <h1 className='font-5xl py-2 font-medium  '>{job.job_role}</h1>
             {job.open ? 
             <div className='bg-green-500 p-2 rounded-md '>
               <h1>open</h1>
             </div>:
             <div className='bg-red-500 rounded-md p-2'>
               <h1>closed</h1>
               </div>}
          </div>
          <h1 className='font-xl py-2 text-left'>{job.job_description}</h1>
          <h1 className='font-xl py-2 text-left'> {job.value}</h1>
          <h1></h1>
        </div>
      </div>
      ))}
      
    </div>
  )
}
