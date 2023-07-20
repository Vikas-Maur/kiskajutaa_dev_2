import React, { useEffect, useState } from 'react'
import databaseService from '@/appwrite/database'
import { X, Heart, Trash } from 'lucide-react'
import useCart from '@/context/useCart'
import Link from 'next/link'
import Image from 'next/image'

export default function Cart() {
    const { cart, total, toggleCart, removeFromCart } = useCart()

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <div onClick={toggleCart} className="absolute top-0 left-0 w-full h-full bg-black/25 backdrop-filter backdrop-blur-lg"></div>
            <div className="bg-white rounded shadow-2xl mx-auto w-full md:w-fit max-w-7xl max-h-screen px-6 z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto">
                <div className="mx-auto max-w-2xl py-4 lg:max-w-full mt-4">
                    <div className="flex gap-12">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Shopping Cart
                        </h1>
                        <button onClick={toggleCart} className="ml-auto block text-gray-600 transition hover:scale-110">
                            <span className="sr-only">Close cart</span>
                            <X size={24} />
                        </button>
                    </div>
                    <form className="mt-5 mb-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="max-h-full overflow-auto rounded-lg bg-white lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul role="list" className="divide-y divide-gray-200">
                                {cart.productIds.map((id, index) => (
                                    <div key={index} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                {(images !== undefined) && <img
                                                    src={images[index]}
                                                    alt={`Your Jutaa #${index + 1}`}
                                                    className="h-24 w-24 rounded-md object-contain object-center"
                                                />}
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <Link href={`/shop/${id}`} className="font-semibold text-black">
                                                                    {`Your Jutaa #${index + 1}`}
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-gray-500">Size: <span className="text-gray-800">{cart.size[index]}</span></p>
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {`Rs. ${cart.price[index]}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="min-w-24 flex">
                                                <button type="button" className="h-7 w-7">
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    defaultValue={cart.quantity[index]}
                                                />
                                                <button type="button" className="flex h-7 w-7 items-center justify-center">
                                                    +
                                                </button>
                                            </div>
                                            <div className="ml-6 flex text-sm">
                                                <button onClick={() => removeFromCart(index)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                    <Trash size={12} className="text-red-500" />
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-5 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex gap-2 items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cart.productIds.length} items)</dt>
                                        <dd className="text-sm font-medium text-gray-900">Rs. {total}</dd>
                                    </div>
                                    <div className="flex gap-2 items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">
                                            <span>Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ 0</dd>
                                    </div>
                                    <div className="flex gap-2 items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex gap-2 items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">Rs. {total}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 flex flex-col gap-5">
                                    <Link
                                        onClick={toggleCart}
                                        href="/shippingaddress"
                                        className="block text-center w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Proceed to checkout
                                    </Link>
                                    <button
                                        onClick={toggleCart}
                                        className="block text-center w-full min-w-fit rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Continue shopping &rarr;
                                    </button>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    )
}

