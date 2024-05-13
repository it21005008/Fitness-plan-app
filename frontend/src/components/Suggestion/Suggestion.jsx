import React from 'react'

function Suggestion() {
  return (
    <div className='border  border-neutral-700 bg-neutral-900 p-2 py-3 rounded-lg flex items-center gap-3'>
        <div className='ring-1 flex items-center justify-center w-fit p-0.5 rounded-full'>
            <div className='w-7 h-7  bg-neutral-500 rounded-full flex items-center justify-center font-semibold text-white'>M</div>
        </div>
        <div className='text-[12px] leading-[13px]'>
            User
        </div>
        <div>
            <div>
                <button className='text-[10px] bg-blue-600 px-2 py-1 text-white font-semibold rounded-lg '>
                    Follow
                </button>
            </div>
        </div>
    </div>
  )
}

export default Suggestion