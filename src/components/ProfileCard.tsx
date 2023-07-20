"use client";
import authService from "@/appwrite/auth";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { User } from 'lucide-react'
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"


export default function ProfileCard (){
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const userData = await authService.getCurrentUser()
            if (userData) {
                setUser(userData)
            }
        })()
    }, [])

    const logout = () => {
        const toastId = toast.loading("Logging you out...")
        router.replace(`/logout?toastId=${toastId}`)
        return <></>;
    }

    return (
        user && (
            <>
                <div className="flex gap-y-6 flex-wrap">
                    <div className="flex w-full gap-x-4 items-center">
                        <div className="shrink-0 w-fit h-fit rounded-full p-2 bg-black text-white shadow-2xl">
                            <User width={50} height={50} />
                        </div>
                        <div className="relative">
                            <p className="font-bold text-xl w-full mb-1">{user.name}</p>
                        </div>
                    </div>
                    <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Display Name</p>
                            <p className="font-semibold">{user.name}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Email Id</p>
                            <p className="font-semibold">{user.email}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Phone Number</p>
                            <p className="font-semibold">{user.phone? user.phone: "Null"}</p>
                        </div>
                        <div className="relative w-full">
                            <p className="text-sm text-gray-700">Password</p>
                            <p className="font-semibold">********</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            onClick={logout}
                            className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                        >
                            Logout
                        </button>
                        <img src="https://cloud.appwrite.io/v1/storage/buckets/6486a1266ab33e305cef/files/unique()/view?project=64869d7c5a6beb297c66" alt="Image" />
                    </div>
                </div>
            </>
        )
    );
}

