import React from "react";
import { Settings, ShoppingBag, Newspaper, CheckCheck } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const Sidebar: React.FC = () => {

    return (
        <>
            <div className="flex flex-wrap p-4 gap-5 lg:hidden">
                <div className="w-full flex justify-center items-center"><Link href="/admin"><Image src='/logo-light-70-transparent.png' width={70} height={70} alt="Kiska.Jutaa Logo" /></Link></div>
                <Link href='/' className="p-5 bg-gray-200 text-sm rounded mx-auto">Custom Orders</Link>
                <Link href='/' className="p-5 bg-gray-200 text-sm rounded mx-auto">Pre-existing Orders</Link>
                <Link href='/' className="p-5 bg-gray-200 text-sm rounded mx-auto">Fulfilled Orders</Link>
                <Link href='/' className="p-5 bg-gray-200 text-sm rounded mx-auto">All Products</Link>
            </div>
            <aside className="hidden lg:relative lg:flex h-screen w-64 overflow-y-auto border-r bg-white px-5 py-8">
                <div className="flex h-full overflow-y-auto max-w-full flex-col fixed">
                    <Link className="" href="/admin">
                        <Image src='/logo-light-70-transparent.png' width={70} height={70} alt="Kiska.Jutaa Logo" />
                    </Link>
                    <div className="mt-6 flex flex-1 flex-col justify-between">
                        <nav className="-mx-3 space-y-6 ">
                            <div className="space-y-3 ">
                                <label className="px-3 text-xs font-semibold uppercase text-gray-900">Orders</label>
                                <Link
                                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                    href="#"
                                >
                                    <Settings className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Custom orders</span>
                                </Link>
                                <Link
                                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                    href="#"
                                >
                                    <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Pre existing orders</span>
                                </Link>
                                <Link
                                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                    href="#"
                                >
                                    <CheckCheck className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">Fulfilled orders</span>
                                </Link>
                            </div>
                            <div className="space-y-3 ">
                                <label className="px-3 text-xs font-semibold uppercase text-gray-900">Product</label>
                                <Link
                                    className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                                    href="#"
                                >
                                    <Newspaper className="h-5 w-5" aria-hidden="true" />
                                    <span className="mx-2 text-sm font-medium">All products</span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar