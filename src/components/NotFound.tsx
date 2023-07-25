import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NotFound: React.FC = () => {
    return (
        <div className='fixed z-50 top-0 left-0 w-screen h-screen bg-black text-gray-300 flex justify-center items-center'>
            <div className='text-center'>
                <Image src='/logo-dark-transparent.png' width={100} height={100} alt='Kiska Jutaa Logo' className='mx-auto' />
                <h2 className='text-lg text-white font-bold mt-4 mb-4'>404 | Not Found</h2>
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