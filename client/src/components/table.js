import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Table(props) {
  const { data } = props;
  console.log(data)
  let navigate = useNavigate();

  return (
    <div>
      <div className="relative py-16 ">
        <div className="w-full mb-12 px-4">
          <div
            className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
  bg-black text-white"
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-white">Daos</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr className="bg-black">
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Rank
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Dao
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Treasury
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      value
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Symbol
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Users
                    </th>
                    {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Completion </th> */}
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((dao) => (
                    <tr
                      onClick={() => navigate(`/dao/${dao.contract_address}`)}
                      key={dao.rank}
                      className="cursor-pointer	hover:bg-gray-900 "
                    >
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <h1>{dao.rank}</h1>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <img
                          src={dao.logo_url}
                          className="h-12 w-12 bg-white rounded-full border"
                          alt="..."
                        />
                        <span className="ml-3 font-bold text-white">
                          {dao.contract_name}{' '}
                        </span>
                      </td>
                      {/* treasury bal here */}
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {dao.treasury.toFixed(2)}
                      </td>
                      {/* coin value */}
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {dao.quote_rate.toFixed(4)}
                      </td>

                      {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i className="fas fa-circle text-orange-500 mr-2"></i>pending</td> */}

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex justify-center">
                          <span className="mr-2">
                            {dao.contract_ticker_symbol}
                          </span>
                          {/* <div className="relative w-full">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                    <div style={{width: '60%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
                  </div>
                </div> */}
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex justify-center">
                          <img
                            src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
                            alt="..."
                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                          />
                          <img
                            src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                            alt="..."
                            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                          />
                        </div>
                      </td>

                      {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
              <a href="#pablo" className="text-blueGray-500 block py-1 px-3" onclick="openDropdown(event,'table-dark-1-dropdown')">
                <i className="fas fa-ellipsis-v"></i></a>
              <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" id="table-dark-1-dropdown">
                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">Action</a><a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">Another action</a><a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">Something else here</a>
                <div className="h-0 my-2 border border-solid border-blueGray-100"></div>
                <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">Seprated link</a>
              </div>
            </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
