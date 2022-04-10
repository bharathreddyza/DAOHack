import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

import Votes from '../components/Votes';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ProposalPage() {
  const { id } = useParams();
  const activeDao = useSelector((state) => state.dao.activeDao);
  const { proposals } = activeDao;
  const proposal = proposals.find((proposal) => proposal.id === id);
  const { voteCounts } = proposal;

  const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);
  const data = Object.keys(voteCounts).map((choice) => {
    return { name: choice, value: (voteCounts[choice] / totalVotes) * 100 };
  });
  console.log(data);
  // const data = [];
  // const data1 = proposal.choices.map((choice) =>
  //   data.push({ field: choice, decision: proposal.voteCounts[choice] })
  // );
  // const data1 = [];
  // console.log(data);
  // console.log(proposal);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#ffff',
            padding: '5px',
            border: '1px solid #cccc',
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value.toFixed(
            2
          )}%`}</label>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-10 text-gray-800">
      <div className="mx-20">
        <div className="">
          <h1 className="text-2xl font-medium text-gray-800">
            {proposal.title}
          </h1>
        </div>

        <div className="w-3/4 mx-auto mt-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <img
                className="w-8 h-8"
                src={activeDao.dao.logo_url}
                alt="Logo"
              />
              <h1 className="text-sm self-center">
                {proposals.contract_name} by{' '}
                <span className="text-sm">
                  {proposal.author.slice(0, 6)} ... {proposal.author.slice(-4)}
                </span>{' '}
              </h1>
            </div>
            <div class=" cursor-default">
              {proposal.state === 'closed' ? (
                <h1 className=" p-1 rounded-md  m-1 bg-red-200 text-red-400">
                  closed
                </h1>
              ) : (
                <h1 className="p-1 bg-green-200 text-green-400">open</h1>
              )}
            </div>
          </div>
          <h1 className="py-4 text-justify leading-relaxed">
            {proposal.body}.
          </h1>
        </div>
      </div>

      <div className="m-4 border">
        <h1 className="mt-4 text-2xl">Results</h1>
        <div>
          <div className="yesno">
            {/* <div className="flex justify-between">
              <h1>Yes</h1>
              <h1>5.3M SWISE 100%</h1>
            </div> */}
            <div className="flex justify-center">
              <PieChart width={800} height={350}>
                <Pie
                  data={data}
                  cx={'50%'}
                  cy={'50%'}
                  fill="#8884d8"
                  paddingAngle={1}
                  nameKey="name"
                  dataKey="value"
                  className="cursor-pointer"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend></Legend>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Votes data={proposal} />
      </div>
    </div>
  );
}
