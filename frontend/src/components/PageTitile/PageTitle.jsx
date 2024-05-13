import React from 'react';

function PageTitle(props) {
  return (
    <div className='bg-slate-800 px-3 py-3 border-l-2 border-slate-600 rounded-xl '>
        <div className='flex items-center  gap-3'>
            <div className='w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M2 3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z" />
                    <path fillRule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 0 1-1.99 1.79H4.802a2 2 0 0 1-1.99-1.79L2 7.5ZM7 11a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>
            </div>

            <div className=''>
                <div>
                    <div className='font-semibold'>{props.title}</div>
                </div>

                <div>        
                    <div className='text-white/40 -mt-1 text-xs'>{props.subtitle}</div>
                </div>
            </div>
        </div>

      
    </div>
  );
}

export default PageTitle;
