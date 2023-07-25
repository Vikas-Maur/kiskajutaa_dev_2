'use client'

import React, { FormEvent, useEffect, useState } from "react";
import Dialog from "../Dialog";
import { Models } from "appwrite";
import { X } from "lucide-react";
import { NEW_DESIGN_STATUS } from "@/utils/utils";
import { toast } from "react-hot-toast";
import databaseService from "@/appwrite/database";

type Props = {
    order: Models.Document,
    toggleFunction: () => void
}

const NewOrderDialog: React.FC<Props> = ({ toggleFunction, order }) => {

    const initialData = { status: order.status, price: order.price }
    const ORDER_ID = order.$id
    const [data, setData] = useState({ ...initialData })
    const [allowUpdate, setAllowUpdate] = useState<boolean>(false)

    useEffect(() => {
        if (data.status === 'REJECTED') {
            setAllowUpdate(true)
        } else if (data.status === 'ACCEPTED' && data.price !== initialData.price) {
            setAllowUpdate(true)
        } else {
            setAllowUpdate(false)
        }
    }, [data])

    const submittingForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const toastId = toast.loading("Updating the order info...")
        try {
            const response = await databaseService.updateNewDesignOrder(ORDER_ID, data)
            toast.success('Successfully updated the product, Hurray!', { id: toastId })
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }
    }

    return (
        <Dialog toggleFunction={toggleFunction}>
            <div className="bg-white z-50 max-h-full max-w-5xl p-8 rounded overflow-auto ">
                <div className="flex justify-between items-center gap-8">
                    <h3 className="text-2xl font-bold text-gray-900">Order #{order.$id}</h3>
                    <button onClick={toggleFunction} className="block rounded p-2 hover:bg-gray-100"><X /></button>
                </div>
                <div className="flex flex-col lg:flex-row mt-8 gap-4">
                    <div className="cursor-pointer w-full max-w-xs bg-white rounded-md">
                        <img
                            src={order.imageSrc}
                            alt={`Order Image #${order.image}`}
                            className="w-full h-full rounded-md object-fit"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="text-sm text-gray-700">Email: <span className="font-bold">{order.email}</span></div>
                            <div className="text-sm text-gray 700">Size: <span className="text-base inline-flex rounded-full bg-gray-100 px-2 leading-5 font-bold text-gray-800">{order.size}</span></div>
                            <div className="text-sm text-gray 700">Address: <span className="">{order.address}</span></div>
                            <div className="text-sm text-gray 700">Message: <span className="">{order.message}</span></div>
                        </div>
                        <form onSubmit={submittingForm} className="mt-4">
                            <div className="border-b-2 border-gray-100 pb-4 flex flex-col gap-8">
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="price" className="">Price: </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        required
                                        name="price"
                                        id="price"
                                        onChange={(e) => { setData((prev) => ({ ...prev, price: parseInt(e.target.value) })) }}
                                        className="flex-1 hover:bg-gray-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-14"
                                    />
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="status" className="">Status: </label>
                                    <select
                                        required
                                        value={data.status}
                                        name="status"
                                        id="status"
                                        onChange={(e) => { setData((prev) => ({ ...prev, status: e.target.value })) }}
                                        className="flex-1 hover:bg-gray-100 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5"
                                    >
                                        {NEW_DESIGN_STATUS.map((size) => {
                                            return <option value={size} key={size}>{size}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-8">
                                <button
                                    type="submit"
                                    disabled={!allowUpdate}
                                    className={"rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 disabled:opacity-50 disabled:hover:bg-black" + " disabled:cursor-not-allowed"}
                                >
                                    {allowUpdate ? "Update" : "No changes are made"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default NewOrderDialog