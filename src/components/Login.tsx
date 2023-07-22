"use client";
import authService from "@/appwrite/auth";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Footprints } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
    const router = useRouter()
    const { setAuthStatus } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const toastId = toast.loading("Please wait while we log you in...")
        try {
            const session = await authService.login(formData);
            toast.success("Successfully Logged In :)",{id: toastId})
            if (session) {
                setAuthStatus(true)
                router.push("/profile")
            }

        } catch (error: any) {
            setError(error.message)
            toast.error(error.message, {id: toastId})
        }
    }

    return (
        <div className="flex w-full justify-center overflow-hidden">
            <div className="w-full max-w-lg rounded-xl px-12 py-6 border bg-gray-100">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[60px]">
                        <Footprints width={60} height={60}/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-800">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        href="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:text-gray-300 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex text-black h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex text-black h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}