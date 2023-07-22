import React from 'react'
import Link from 'next/link'

const NotFound: React.FC = () => {
    return (
        <div className='w-screen h-screen bg-black text-gray-300 flex justify-center items-center'>
            <div className='text-center'>
                <h2 className='text-lg text-white font-bold mb-4'>404 | Not Found</h2>
                <p className='mb-3'>Could not find the requested resource</p>
                <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <p><Link className='underline text-white hover:text-gray-300' href="/">Home</Link></p>
                    <p><Link className='underline text-white hover:text-gray-300' href="/profile">Profile</Link></p>
                    <p><Link className='underline text-white hover:text-gray-300' href="/shop">Shop</Link></p>
                </div>
            </div>
        </div>
    )
}

export default NotFound