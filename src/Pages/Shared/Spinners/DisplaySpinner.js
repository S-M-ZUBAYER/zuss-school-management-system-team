import React from 'react'

const DisplaySpinner = () => {
    return (
        <div className='flex justify-center items-center bg-gradient-to-l from-blue-900 via-slate-900 to-black h-screen'>
            <p className='text-7xl font-bold text-fuchsia-900'>L</p>
            <div className='w-10 h-10 border-8 border-dashed rounded-full animate-spin mt-5 border-blue-400'></div>
            <p className='text-7xl font-bold text-fuchsia-900'>ading....</p>
        </div>
    )
}

export default DisplaySpinner;