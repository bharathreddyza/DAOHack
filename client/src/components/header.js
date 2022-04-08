/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
 import { connectWallet } from '../Api/metamask';
 import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import { covalentThunks } from '../app/covalentSlice';
import { useNavigate } from 'react-router-dom';

export default function Example() {
  const navigate = useNavigate();
   

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h1
              onClick={() => navigate('/')}
              className="cursor-pointer text-3xl"
            >
              DAOfordao
            </h1>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <a
              onClick={() => navigate('/')}
              href="#"
              className="cursor-pointer text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Daos
            </a>
            <a
              onClick={() => navigate('/jobBoard')}
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Jobs
            </a>
            <a
              onClick={() => navigate('/news')}
              href="#"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              News
            </a>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
              onClick={() => navigate(`/users/user1`)}
              href="#"
              className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Profile
            </a>
            
            
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-medium cursor-pointer">
                    DaoForDao
                  </h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {/* {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                    >
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </a>
                  ))} */}
                  <a
                    onClick={() => navigate('/')}
                    href="#"
                    className="-m-3 p-3   items-center rounded-md hover:bg-gray-50 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Daos
                  </a>
                  <a
                    onClick={() => navigate('/jobBoard')}
                    href="#"
                    className="-m-3 p-3   items-center rounded-md hover:bg-gray-50 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Jobs
                  </a>
                  <a
                    onClick={() => navigate('/news')}
                    href="#"
                    className="-m-3 p-3   items-center rounded-md hover:bg-gray-50 text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    News
                  </a>

                
                
  
                 </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8"></div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Profile
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
