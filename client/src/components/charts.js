import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
// const data = [{date: "01/04/2021",value: 1139344830},{date: "01/04/2021",value: 11394344800},{date: "01/04/2021",value: 1139344800},{date: "01/04/2021",value: 1139344800}];

export default function Charts() {
  const daoState = useSelector((state) => state.dao?.activeDao.dao);
  // const daoAnalytics = useSelector((state) => state.covalent.activeDaoTreasury);
  const topTokenHolders = useSelector(
    (state) => state.covalent.topTokenHolders
  );

  const data = daoState.treasuryOrder?.map((date) => {
    return { date, treasury: daoState.treasuryOverTime[date] };
  });

  // const data = daoAnalytics?.order.map((date) => {
  //   return {
  //     date: date,
  //     treasury: daoAnalytics.treasury[date],
  //   };
  // });

  console.log(data);
  const treasuries = data?.map((item) => item.treasury);

  const max = Math.max(...treasuries);
  const intervals = [];
  const raise = parseInt(max / 3);
  for (let i = 0; i <= max; i += raise) {
    intervals.push(i);
  }

  console.log(intervals);
  useEffect(() => {}, [data]);

  return (
    <div className="mt-28 mx-10">
      <h1 className="mb-5 text-left text-2xl text-gray-700">
        Treasury Over Time
      </h1>
      <div className="flex justify-center">
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis ticks={intervals} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="treasury"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    </div>
  );
}
