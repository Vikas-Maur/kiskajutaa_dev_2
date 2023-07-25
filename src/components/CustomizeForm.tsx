"use client"
import authService from "@/appwrite/auth";
import databaseService from "@/appwrite/database";
import storageService from "@/appwrite/storage";
import { useEffect, useState, FormEvent } from "react";
import { NewDesignOrderCollection } from "@/utils/types";
import { toast } from 'react-hot-toast'

export default function CustomizeForm() {
    const [formData, setFormData] = useState<NewDesignOrderCollection>({
        email: "",
        size: 4,
        image: "",
        address: "",
        message: "",
        imageSrc: ""
    })

    const [file, setFile] = useState<File>()
    const [addressData, setAddressData] = useState<{
        pincode: string,
        city: string,
        state: string,
        address: string
    }>({
        pincode: "",
        city: "",
        state: "",
        address: "",
    })

    const orderShoe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { address, city, state, pincode } = addressData
        if (!file) {
            toast.error("Please select a design file first! :(")
            return
        }
        if (address === '' || pincode === '' || city === '' || state === '') {
            toast.error('Please enter all the details propery...')
            return
        }
        const toastId = toast.loading('Sending your design...')
        try {
            const { imageId, imageSrc } = await storageService.uploadNewDesignFile(file)
            await databaseService.orderNewDesignShoe({ ...formData, image: imageId, imageSrc: imageSrc, address: `${address}, ${city}, ${state}, ${pincode}` })
            toast.success('Successfully sent the design, Hurray!', { id: toastId })
        } catch (error: any) {
            console.log(error);
            toast.error(error.message, { id: toastId })
        }

    }

    useEffect(() => {
        (async () => {
            const userData = await authService.getCurrentUser()
            if (userData) {
                setFormData((prev) => ({ ...prev, email: userData.email }))
            }
        })()
    }, [])

    return (
        <div className="overflow-hidden">
            <div className="mx-auto max-w-full px-5 py-12">
                <div className="mx-auto flex flex-wrap lg:w-4/5">
                    <img
                        alt="Nike Air Max 21A"
                        className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                        src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                    />
                    <div className="flex shrink-0 flex-col mt-6 w-full lg:pl-10 lg:w-1/2 lg:mt-0">
                        <div className="pb-5">
                            <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
                                Customize Your Shoe Now
                            </h2>
                        </div>
                        <form onSubmit={orderShoe}>
                            <div className="mb-2 pt-0 5">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="customizeSize"
                                >
                                    Select Size
                                </label>
                                <select
                                    id="customizeSize"
                                    required
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            size: parseInt(e.target.value),
                                        }));
                                    }}
                                    className=" border border-black/30 text-sm rounded-lg focus:ring-black/30 focus:ring-offset-1 block w-full p-2.5"
                                >
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="mb-2 pt-0.5">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="customizeMessage"
                                >
                                    Message
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Any special instructions/message you want to give us (like gift option etc)..."
                                    id="customizeMessage"
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            message: e.target.value,
                                        }));
                                    }}
                                ></input>
                            </div>
                            <div className="mb-2 pt-0.5">
                                <label className="block">
                                    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select the design</span>
                                    <input
                                        type="file"
                                        accept=".png,.jpg,.svg,.gif"
                                        required
                                        onChange={(e) => { if (e.target.files) setFile(e.target.files[0]) }}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-black/80 cursor-pointer "
                                    />
                                    {file && (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            className="mt-2 max-w-xs aspect-square"
                                            alt=""
                                        />
                                    )}
                                </label>
                            </div>
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
                                            value={addressData.address}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setAddressData((prev) => ({
                                                    ...prev,
                                                    address: e.target.value,
                                                }));
                                            }}
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
                                            value={addressData.city}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setAddressData((prev) => ({
                                                    ...prev,
                                                    city: e.target.value,
                                                }));
                                            }}
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
                                            value={addressData.state}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setAddressData((prev) => ({
                                                    ...prev,
                                                    state: e.target.value,
                                                }));
                                            }}
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
                                            value={addressData.pincode}
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setAddressData((prev) => ({
                                                    ...prev,
                                                    pincode: e.target.value,
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4 mt-2">
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Send your design...
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}