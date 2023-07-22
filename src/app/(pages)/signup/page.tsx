"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Signup from "@/components/Signup";

const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    useEffect(() => {
        if (authStatus) {
            router.replace("/profile");
        }
    })

    return (
        <section className="px-4 sm:px-6 py-6 lg:px-8">
            <Signup />
        </section>
    )
}

export default SignupPage;