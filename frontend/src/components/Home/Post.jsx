import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
function Post({ post }) {
    const navigate = useNavigate(); // Define navigate function

    const getTimeDifference = (createdAt) => {
        return new Date() - new Date(createdAt);
    };

  return (
    <div className='bg-slate-800 shadow-md p-5 rounded-lg'>
        <div className='space-y-3'>
            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-slate-400 rounded-full text-white font-bold flex items-center justify-center'>W</div>
                <div className='text-sm font-semibold capitalize'>
                    {post.createdBy ? post.createdBy.name : 'Unknown'}
                </div>
                <div className='pl-3 -mt-1Z'>
                    <button className='text-xs text-blue-600 rounded-lg font-semibold'>
                        {getTimeDifference(post.createdAt)}
                    </button>
                </div>
            </div>
            <div className='cursor-pointer w-fit'>
                <p className='text-sm'>
                    {post.caption}
                </p>
            </div>

            <div className='flex gap-2 '>
                <div className='cursor-pointer'>
                    <img className='h-80 w-auto' src={post.imageUrl} alt="" />
                </div>
                
                <div className='hidden w-40 grid space-y-2'>
                    <div className='border border-slate-700'></div>
                    <div className='border border-slate-700 bg-slate-900'>
                        <div className='flex items-center justify-center h-full text-2xl font-semibold'>
                            2+
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex items-center gap-8'>
                    <button className='flex items-center gap-1'>        
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                        </div>
                        <div className='text-sm'>Like</div>
                    </button>

                    <button className='flex items-center gap-1'>        
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>
                        </div>
                        <div className='text-sm'>Comment</div>
                    </button>

                    <button className='flex items-center gap-1'>        
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>

                        </div>
                        <div className='text-sm'>Share</div>
                    </button>
                </div>
            </div>

            <div className='flex gap-2'>
                <div>
                    <div className='w-9 h-9 bg-slate-300 rounded-full'></div>
                </div>
                <div className='bg-slate-700 p-3 rounded-r-lg rounded-bl-lg w-full'>
                    <div>
                        <input type="text" name="" placeholder='Comment as user' className='w-full focus:outline-none border-none bg-transparent placeholder:text-sm' id="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post