import React, { useEffect, useState } from 'react'
import databaseService from '@/appwrite/database'
import Dialog from './Dialog'
import { X, Heart, Trash } from 'lucide-react'
import useCart from '@/context/useCart'
import Link from 'next/link'
import Image from 'next/image'
import { CartItem } from '@/utils/types'

const Cart: React.FC = () => {
    const { cart, total, updateCart, toggleCart, removeFromCart } = useCart()

    const minusProduct = (index: number, product: CartItem) => {
        if (product.quantity - 1 === 0) {
            removeFromCart(index)
        } else { updateCart(index, { ...product, quantity: product.quantity - 1 }) }

    }
    const plusProduct = (index: number, product: CartItem) => {
        updateCart(index, { ...product, quantity: product.quantity + 1 })
    }

    return (
        <Dialog toggleFunction={toggleCart}>
            <div className="z-50 bg-white p-6 rounded shadow-2xl md:w-fit max-w-full max-h-full overflow-auto">
                <div className="flex justify-between gap-12 pb-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    <button onClick={toggleCart} className="block rounded p-2 hover:bg-gray-100"><X /></button>
                </div>
                <div className="mt-4 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="max-h-full overflow-auto rounded-lg bg-white lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul role="list" className="divide-y divide-gray-200">
                            {cart.map((product, index) => (
                                <div key={index}>
                                    <li className="flex py-6 sm:py-6 ">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.imageSrc}
                                                alt={`Your Jutaa #${index + 1}`}
                                                className="h-24 w-24 rounded-md object-contain object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <Link onClick={toggleCart} href={`/shop/${product.id}`} className="font-semibold text-black">
                                                                {`Your Jutaa #${index + 1}`}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-sm text-gray-500">Size: <span className="text-gray-800">{product.size}</span></p>
                                                    </div>
                                                    <div className="mt-1 flex items-end">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {`Rs. ${product.price}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="mb-2 flex">
                                        <div className="min-w-24 flex">
                                            <button onClick={() => minusProduct(index, product)} type="button" className="h-7 w-7">
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                                value={product.quantity}
                                                disabled
                                            />
                                            <button onClick={() => plusProduct(index, product)} type="button" className="flex h-7 w-7 items-center justify-center">
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
                                    <dt className="text-sm text-gray-800">Price ({cart.length} items)</dt>
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
                </div>
            </div>
        </Dialog>
    )
}

export default Cart