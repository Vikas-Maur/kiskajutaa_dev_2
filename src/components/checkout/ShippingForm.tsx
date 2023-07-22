'use client'
import React, { FormEvent, useState } from "react";
import useAddress from "@/context/useAddress";
import { useRouter } from "next/navigation";

const ShippingForm: React.FC = () => {
    const router = useRouter()
    const { address, setAddress } = useAddress()
    const [formData, setFormData] = useState({ ...address })

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAddress(formData)
        router.push('/checkout')
        return <></>
    }

    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <form onSubmit={submitForm}>
                    <div className="mx-auto max-w-5xl px-4 lg:max-w-none lg:px-0">
                        <div>
                            <h3
                                id="contact-info-heading"
                                className="text-3xl font-semibold text-gray-900"
                            >
                                Contact information
                            </h3>

                            <div className="mt-4 w-full">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="shippingFullName"
                                >
                                    Full Name
                                </label>
                                <input
                                    required
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your name"
                                    id="shippingFullName"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData((prev: any) => ({ ...prev, fullname: e.target.value }))}
                                />
                            </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Shipping address
                            </h3>

                            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="shippingAddress"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="text"
                                            id="shippingAddress"
                                            name="address"
                                            autoComplete="street-address"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.address}
                                            onChange={(e) => setFormData((prev: any) => ({ ...prev, address: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="shippingCity"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="text"
                                            id="shippingCity"
                                            name="city"
                                            autoComplete="address-level2"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.city}
                                            onChange={(e) => setFormData((prev: any) => ({ ...prev, city: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="shippingRegion"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        State / Province
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="text"
                                            id="shippingRegion"
                                            name="region"
                                            autoComplete="address-level1"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.state}
                                            onChange={(e) => setFormData((prev: any) => ({ ...prev, state: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="shippingPincode"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Postal code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            required
                                            type="text"
                                            id="shippingPincode"
                                            name="postal-code"
                                            autoComplete="postal-code"
                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.pincode}
                                            onChange={(e) => setFormData((prev: any) => ({ ...prev, pincode: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 justify-end border-t border-gray-200 pt-6">
                            <button
                                type="submit"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Proceed to checkout
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShippingForm