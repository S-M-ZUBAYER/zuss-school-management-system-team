import { HandThumbDownIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/UserContext'

const ErrorPage = () => {
    const { schoolName } = useContext(AuthContext)
    return (
        <section className='flex items-center h-screen p-16 bg-gray-100 text-gray-900'>
            <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
                <HandThumbDownIcon className='w-40 h-40 text-amber-500' />
                <div className='max-w-md text-center'>
                    <h2 className='mb-8 font-extrabold text-9xl text-gray-500'>
                        <span className='sr-only'>Error</span>
                        <div className='flex justify-center items-center h-full font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                            4
                            <div className='w-24 h-24 border-8 border-dashed rounded-full animate-spin mt-3 border-blue-400'></div>
                            4
                        </div>
                    </h2>
                    <p className='text-2xl font-semibold md:text-3xl mb-8'>
                        Sorry, we couldn't find this page.
                    </p>
                    <Link to={`/`}>
                        <button className='px-8 py-3 font-semibold text-lg rounded bg-red-300'>
                            Back to homepage
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ErrorPage