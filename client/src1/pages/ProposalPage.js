import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import Votes from '../components/Votes'; 

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
export default function ProposalPage() {
    const {id} = useParams()
    const state = useSelector((state)=> state.dao.activeDao.proposals);
    const proposal =state.filter(proposal =>proposal.id == id)
    const data = [];
    const data1 = proposal[0].choices.map((choice)=>data.push({field:choice,decision:proposal[0].voteCounts[choice]}))
    console.log(data)
    console.log(proposal)
   return (
    <div>
             <div className='mx-20'>
                <div className=''>
                     <h1 className='text-2xl font-medium'>{proposal[0].title}</h1></div>

                    <div className='flex'>
                    <div className='flex'>
                    <div>
                    <button className=''>
                        {proposal[0].state == "closed" ? <h1 className=' p-1 rounded-md  m-1 bg-red-500'>closed</h1> : <h1 className='bg-green-600'>open</h1>}
                    </button>
                </div>
                <img className='w-8 h-8' src={state.logo_url}/>
                <h1 className='text-sm align-middle'>{state.contract_name} by <span className='text-xs'>{proposal[0].author.slice(0, 6)} ... {proposal[0].author.slice(-4)}</span> </h1>
                </div>
               
                    </div>

                     <h1 className='py-4 text-left'>{proposal[0].body}...</h1>

            </div>

            <div className='m-4 border'>
                <h1 className='p-4 text-lg font-semibold'>Results</h1>
                <div>
                    <div className='yesno'>
                            <div className='flex justify-between'>
                                <h1>Yes</h1>
                                <h1>5.3M SWISE 100%</h1>
                            </div>
                            <div>
                            <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="decision"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Pie
          data={data1}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="decision"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
                            </div>
                    </div>
                </div>
            </div>
          <div>
            <Votes data={proposal[0]}/>
          </div>
     </div>
  )
}
