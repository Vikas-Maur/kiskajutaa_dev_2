"use client";
import authService from "@/appwrite/auth";
import useAuth from "@/context/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const LogoutPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const { setAuthStatus } = useAuth();

    useEffect(() => {
        authService.logout()
            .then(() => {
                setAuthStatus(false);
                router.replace("/");
            })

        const toastId = searchParams.get('toastId');
        if (toastId) {
            toast.success("Successfully logged you out!", { id: toastId })
        }
    }, []);

    return (
        <></>
    )
}


export default LogoutPage;