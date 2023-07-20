"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import Signup from "@/components/Signup";

const SignupPage = () => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (authStatus) {
        router.replace("/profile");
        return <></>;
    }

    return(
        <section className="bg-gradient-to-r from-neutral-800 to-black px-4 sm:px-6 py-6 lg:px-8">
            <Signup />
        </section>
    )
}

export default SignupPage;