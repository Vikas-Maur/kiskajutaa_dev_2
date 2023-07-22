'use client'

import React, { useEffect, useState } from "react";
import authService from "@/appwrite/auth";
import databaseService from "@/appwrite/database";
import { useRouter } from "next/navigation";
import { Address, CartItem, ExistingDesignOrderCollection } from "@/utils/types";
import Link from "next/link";
import { toast } from "react-hot-toast";

type Props = {
    cart: Array<CartItem>,
    address: Address,
}

const FinalOrder: React.FC<Props> = ({ cart, address }) => {
    const [order, setOrder] = useState<ExistingDesignOrderCollection>({
        email: '',
        fullname: address.fullname,
        productid: [],
        quantity: [],
        size: [],
        price: [],
        imageSrc: [],
        address: `${address.address}, ${address.city}, ${address.state}, ${address.pincode}`,
        message: '',
    })
    const [total, setTotal] = useState<number>(0)
    const [loader, setLoader] = useState<boolean>(true)
    const router = useRouter()

    const placeOrder = async () => {
        const toastId = toast.loading('Placing the order...')
        try {
            await databaseService.orderExisitingDesignShoe(order)
            toast.success('Successfully placed the order, Hurray!', { id: toastId })
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }
    }

    useEffect(() => {
        (async () => {
            const userData = await authService.getCurrentUser()
            const productid: Array<string> = []
            const imageSrc: Array<string> = []
            const quantity: Array<number> = []
            const size: Array<number> = []
            const price: Array<number> = []
            let totalPrice: number = 0

            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];
                const prod = await databaseService.readProduct(cartItem.id)
                if (!prod) continue
                productid.push(prod.$id)
                quantity.push(cartItem.quantity)
                size.push(cartItem.size)
                imageSrc.push(prod.imageSrc)
                price.push(prod.price)
                totalPrice += prod.price * cartItem.quantity
            }

            setTotal(totalPrice)
            setOrder((prev) => ({ ...prev, email: userData?.email || '', productid, quantity, size, price, imageSrc }))
            setLoader(false)
        })()
    }, [])

    return (
        <div className="bg-white p-6 rounded md:w-fit max-w-full max-h-full mx-auto lg:max-w-5xl">
            <div className="flex justify-between gap-12 pb-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Please check order details
                </h1>
            </div>
            <div className="mt-4 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                <section aria-labelledby="cart-heading" className="max-h-full overflow-auto rounded-lg bg-white lg:col-span-7">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your order are:
                    </h2>
                    <ul role="list" className="divide-y divide-gray-200">
                        {loader && cart.map((_, index) => { return <li key={index} className="mt-2 mb-2 w-full h-48 animate-pulse bg-gray-300"></li> })}

                        {!loader && order.productid.map((id, index) => (
                            <div key={index}>
                                <li className="flex py-6 sm:py-6 ">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={order.imageSrc[index]}
                                            alt={`Your Jutaa #${index + 1}`}
                                            className="h-24 w-24 rounded-md object-contain object-center"
                                        />
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
                                                <div className="mt-1 flex text-sm justify-between gap-2">
                                                    <p className="text-sm text-gray-500">Size: <span className="text-gray-800">{order.size[index]}</span></p>
                                                    <p className="text-sm text-gray-500">Quantity: <span className="text-gray-800">{order.quantity[index]}</span></p>
                                                </div>
                                                <div className="mt-1 flex items-end">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {`Rs. ${order.price[index]}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
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
                        Price and Address details
                    </h2>
                    <div>
                        <dl className="space-y-1 px-2 py-4">
                            <div className="flex gap-4 items-center justify-between mb-4">
                                <dt className="text-sm text-gray-800">Address</dt>
                                <dd className="text-xs font-medium text-gray-900">{order.address}</dd>
                            </div>
                            <div className="flex gap-2 items-center justify-between">
                                <dt className="text-sm text-gray-800">Price ({order.productid.length} items)</dt>
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
                            <button
                                onClick={placeOrder}
                                className="block text-center w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Proceed to payment
                            </button>
                            <Link
                                href='/shop'
                                className="block text-center w-full min-w-fit rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Make Changes
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FinalOrder