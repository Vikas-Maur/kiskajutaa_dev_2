'use client'
import React, { useState } from "react";
import NewOrderDialog from "./NewOrderDialog";
import { Models } from "appwrite";
import { Check, XCircle } from "lucide-react";

type Props = {
    order: Models.Document
}

const NewDesignTableRow: React.FC<Props> = ({ order }) => {

    const [orderDialog, setOrderDialog] = useState<boolean>(false)

    const toggleOrderDialog = () => setOrderDialog(prev => !prev)

    return (
        <>
            <tr onClick={toggleOrderDialog} className="cursor-pointer hover:bg-gray-100 transition-all">
                <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center">
                        <div className="">
                            <img
                                className="h-80 w-80 min-w-[320px] rounded-full object-cover"
                                src={order.imageSrc}
                                alt={order.image}
                            />
                        </div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-12 py-4">
                    <div className="ml-4">
                        {/* <div className="text-sm font-medium text-gray-900">{order.fullname}</div> */}
                        <div className="text-sm text-gray-700">{order.email}</div>
                    </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4">
                    <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                        {order.size}
                    </span>
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                    {order.status}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                    {order.price}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                    {order.paid ? <span className="text-green-500"><Check /></span> : <span className="text-red-500"><XCircle /></span> }
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                    {order.address}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                    {order.message}
                </td>
            </tr>
            {orderDialog && <NewOrderDialog order={order} toggleFunction={toggleOrderDialog} />}
        </>
    )
}

export default NewDesignTableRow