'use client'
import React, { useEffect, useState } from "react"
import databaseService from "@/appwrite/database"
import { Models } from "appwrite"
import NewDesignTableRow from "@/components/admin/NewDesignTableRow"

const AdminPage: React.FC = () => {

    const [orders, setOrders] = useState<Array<Models.Document>>([])

    const fetchOrders = async () => {
        try {
            const fetchedOrders = await databaseService.readAllNewDesignOrders()
            if (fetchedOrders) setOrders(fetchedOrders.documents)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8" >Orders Page</h1>
            <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold"> Custom Orders </h2>
                <section className="mx-auto w-full max-w-5xl py-4">
                    <div className="mt-6 flex flex-col">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="w-fit px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    <span>Design</span>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Email
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Size
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Paid
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Address
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                >
                                                    Message
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {orders.map((order, index) => (
                                                <NewDesignTableRow order={order} key={index} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AdminPage