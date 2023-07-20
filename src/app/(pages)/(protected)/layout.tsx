"use client"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'

import React from "react"

const ProtectedLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const router = useRouter();
    const { authStatus } = useAuth();

    if (!authStatus) {
      toast.error("Please login or signup to continue...")
        router.replace("/login");
        return <></>;
    }
    return children

}

export default ProtectedLayout;