import React, { useEffect, useState } from 'react';
import Logo1 from '../../img/logo1.png';
import { getNameFromToken } from '../../services/User';

function Navigation({ onLogout }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getNameFromToken();
      setUserName(data);
    }
    fetchData();
  }, []);

  return (
    <div className='fixed z-50 w-full'>
      <div className='py-2 px-5 grid grid-cols-5 items-center bg-blue-500 border-b border-blue-400'>
        <div className='flex items-center text-sm font-semibold text-white gap-2'>
          <div>
            <img src={Logo1} alt="Logo1" className='w-12 h-12 rounded-full' />
          </div>
          <div className='text-white'> {/* Changed text-blue-200 to text-white */}
            FitFlex
          </div>
        </div>

        <div className='col-span-3'>
          <div>
            <div className='w-96 rounded-2xl py-1 px-2 bg-blue-400 border border-blue-400 flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <input type="search" name="" className='text-sm focus:outline-none bg-transparent w-full' placeholder='search...' id="" />

            </div>
          </div>
        </div>

        <div className='flex items-center justify-end gap-5'>
          <div className='border-r pr-5'>
            <div className='flex items-center gap-4'>
              <button className='relative'>
                <div className='p-2 bg-blue-400 flex items-center justify-center rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                  </svg>

                </div>
                <div className='absolute -top-1 -right-1 bg-red-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center'>
                  1
                </div>
              </button>

              <button className='relative'>
                <div className='p-2 bg-blue-400 flex items-center justify-center rounded-full'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M4.214 3.227a.75.75 0 0 0-1.156-.955 8.97 8.97 0 0 0-1.856 3.825.75.75 0 0 0 1.466.316 7.47 7.47 0 0 1 1.546-3.186ZM16.942 2.272a.75.75 0 0 0-1.157.955 7.47 7.47 0 0 1 1.547 3.186.75.75 0 0 0 1.466-.316 8.971 8.971 0 0 0-1.856-3.825Z" />
                    <path fillRule="evenodd" d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6Zm0 14.5a2 2 0 0 1-1.95-1.557 33.54 33.54 0 0 0 3.9 0A2 2 0 0 1 10 16.5Z" clipRule="evenodd" />
                  </svg>


                </div>
                <div className='absolute -top-1 -right-1 bg-red-500 text-[10px] text-white w-4 h-4 rounded-full flex items-center justify-center'>
                  1
                </div>
              </button>


            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              {userName && (
                <>
                  <div className='w-8 h-8 bg-blue-400 rounded-full text-white font-bold flex items-center justify-center'>{userName.name[0]}</div>
                  <div className='text-sm font-semibold text-white'>{/* Changed text-black to text-white */}
                    {userName.name}
                  </div>
                </>
              )}
            </div>
            <div className=' border-l flex items-center pl-3'>
              <button className='bg-blue-200 p-1 rounded-lg text-white' onClick={onLogout}> {/* Changed bg-black to bg-white, and text-black to text-white */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;




