'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart, User, LogIn, LogOut, UserCircle2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useAuth from '@/context/useAuth'
import useCart from '@/context/useCart'
import { toast } from 'react-hot-toast'

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Customize',
    href: '/customize',
  },
  {
    name: 'Shop',
    href: '/shop',
  },
]

export default function Navbar() {
  const router = useRouter()
  const { authStatus } = useAuth()
  const { toggleCart } = useCart()
  const [userDialog, setUserDialog] = useState(false)
  const [menuDialog, setMenuDialog] = useState(false)

  return (
    <nav className='w-full py-6 sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 z-40'>
      <div className='mx-auto max-w-6xl flex justify-between items-center px-6 relative'>
        <div className='hidden md:flex  items-center px-2'>
          <ul className="inline-flex gap-6" >
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-950"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden ">
          <Menu onClick={() => setMenuDialog((value) => !value)} />
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Link href="/">
            <Image src="/logo-light-70-transparent.png" width={70} height={70} alt='Kiska Jutaa Logo' />
          </Link>
        </div>
        <div className='flex gap-4 items-center px-2'>
          <button
            type="button"
            onClick={toggleCart}
            className="border-none text-black rounded-full p-2"
          >
            <ShoppingCart />
          </button>
          <button
            type="button"
            onClick={() => setUserDialog((value) => !value)}
            className="border-none text-black rounded-full bg-gray-100 p-2"
          >
            {authStatus? <User />: <LogIn width={24} height={24} />}
          </button>
        </div>
        {menuDialog && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Image src="/logo-light-70-transparent.png" alt='Kiska Jutaa Logo' width={50} height={50} />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuDialog(!menuDialog)
                      }}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                {authStatus && <Link
                  href="/profile"
                  className="block mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Check your profile
                </Link>}
                {!authStatus && <Link
                  href="/login"
                  className="block mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Login to your account
                </Link>}
              </div>
            </div>
          </div>
        )}
        {userDialog && (
          <div className="absolute top-full right-0 px-2 md:mr-8 min-w-fit">
            <div className="flex flex-col bg-white p-2 rounded mt-2 shadow-2xl min-w-fit">
              {authStatus ? (
                <>
                  <Link onClick={() => { setUserDialog((value) => !value) }} href="/profile"><div className="rounded border-b text-blue-500 px-8 py-2 transition-all hover:bg-black hover:text-white flex items-center justify-between gap-6"><p>Check your profile</p><UserCircle2 width={20} height={20} /></div></Link>
                  <button onClick={() => {
                    setUserDialog((value) => !value)
                    const toastId = toast.loading('Logging you out...')
                    router.replace(`/logout?toastId=${toastId}`)
                    return <></>;
                  }}><div className="rounded  text-blue-500 px-8 py-2 transition-all hover:bg-black hover:text-white flex items-center justify-between gap-6"><p>Logout</p><LogOut width={20} height={20} /></div></button>
                </>
              ) : (
                <>
                  <Link onClick={() => { setUserDialog((value) => !value) }} href="/login"><div className="rounded border-b text-blue-500 px-8 py-2 transition-all hover:bg-black hover:text-white flex items-center justify-between gap-6"><p>Sign In</p></div></Link>
                  <Link onClick={() => { setUserDialog((value) => !value) }} href="/signup"><div className="rounded  text-blue-500 px-8 py-2 transition-all hover:bg-black hover:text-white flex items-center justify-between gap-6"><p>Sign Up</p></div></Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
