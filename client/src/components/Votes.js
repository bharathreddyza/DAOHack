import React from 'react';

export default function Votes(props) {
  const { data } = props;
  console.log(data);
  return (
    <div className="mt-10">
      <div className="m-2 rounded-md mx-80">
        <div className="p-2 mb-10">
          <h1 className="mt-4 text-2xl">Votes</h1>
        </div>
        {data.allVotes.votes.map((vote) => (
          <div
            className="flex border p-2 justify-between items-center"
            key={vote.id}
          >
            <div className="flex items-center gap-3">
              <img
                className="rounded-full p-1"
                src="https://stamp.fyi/avatar/eth:0xee0e9A9519bd3138e338A748aF99D1fe1bcEAE5F?s=36"
                alt="img"
              />
              <h1 className="text-md">
                {' '}
                <span className="text-md">{vote.voter}</span>{' '}
              </h1>
            </div>
            <h1>{data.choices[vote.choice]}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
