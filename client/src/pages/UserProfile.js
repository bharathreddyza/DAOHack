import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const {user} = useParams()
  const navigate = useNavigate()
  //fetch data from userslice using user address
  //get user details using the api
  //
  const dummy = {
    "address":"0x5a98fcbea516cf06857215779fd812ca3bef1b32",
    "username":"kenneth",
    "expierince":"35",
    "bio":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Daos":[
      {"contract_name": "Uniswap",
      "contract_ticker_symbol": "UNI",
      "contract_address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "logo_url": "https://logos.covalenthq.com/tokens/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png"
    },
    {
      "contract_name": "Radicle",
      "contract_ticker_symbol": "RAD",
      "contract_address": "0x31c8eacbffdd875c74b94b077895bd78cf1e64a3",
      "logo_url": "https://logos.covalenthq.com/tokens/0x31c8eacbffdd875c74b94b077895bd78cf1e64a3.png",
    }

    ],
    "work":[
      {"jobid":"20",
      "nft":"address",
      "job_role":"UX Designer",
      "jobdescription":"write an artical on our DAO",
      "open":true,
      "contract_name": "Gitcoin",
       "contract_address": "0xde30da39c46104798bb5aa3fe8b9e0e1f348163f",
       "logo_url": "https://logos.covalenthq.com/tokens/0xde30da39c46104798bb5aa3fe8b9e0e1f348163f.png",
       "progressLink":"https://github.com/sairamkrishna1412/Dao-hackathon",
       "value":"3"

      },
      {"jobid":"20",
      "nft":"address",
      "job_role":"UX Designer",
      "jobdescription":"write an artical on our DAO",
      "contract_name": "StakeWise",
      "contract_ticker_symbol": "SWISE",
      "contract_address": "0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2",
      "logo_url": "https://logos.covalenthq.com/tokens/0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2.png",
       "progressLink":"https://github.com/sairamkrishna1412/Dao-hackathon",
       "value":"3"

      }
    ],
    "Nfts":["0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2","0x48c3399719b582dd63eb5aadf12a40b4c3f52fa2"]
  }
  return (
    <div className='my-10 bg-gray-100'>
      <div className='p-3 md:ml-28 flex justify-left'>
        <img className='w-24 h-24 rounded-full ' src='https://ph-avatars.imgix.net/3600866/original?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=30&h=30&fit=crop&dpr=2'/>
       <div className='flex-1'>
       <div className='flex mx-8'>
        <h1 className='text-5xl font-bold'>{dummy.username}</h1>
        <div className='p-1'>
            <button className='text-xs bg-purple-400 rounded-md p-2'>level {dummy.expierince}</button>
        </div>
        </div>
        <div>
          <h1 className='p-3 text-left'>{dummy.bio}</h1>
        </div>
       </div>
       
      </div>
      <div>
        <h1 className='text-5xl'>Daos</h1>
        <div className='flex'>
          {dummy.Daos.map((dao)=>(
            <div className=' flex  rounded-md bg-purple-400 p-2 m-2 align-middle hover:bg-purple-600' onClick={()=>navigate(`/dao/${dao.contract_address}`)} key={dao.contract_address}>
              <img className='w-10' src={dao.logo_url}/>
              <h1 className='text-white p-1 '>{dao.contract_name}</h1>
             </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className='text-4xl'>Work</h1>
        <div>
          {dummy.work.map((job)=>(
          <div key={job.jobid} className='card border rounded-md p-4 m-4  lg:w-1/2 '>
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
            <h1 className='font-xl py-2 text-left'>{job.jobdescription}</h1>
            <h1 className='font-xl py-2 text-left'> {job.value}</h1>
            <h1></h1>
          </div>
        </div>
          ))
               }
        </div>
      </div>
    </div>
  )
}
