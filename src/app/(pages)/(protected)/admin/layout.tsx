'use client'

import authService from "@/appwrite/auth";
import React, { useState } from "react";
import { notFound } from "next/navigation"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loader, setLoader] = useState<boolean>(true)

    authService.isKiskaJutaaTeam().then((resp) => {
        if(!resp){ 
            notFound()
        }

    }).finally(() => setLoader(false))


    return <>{loader ? <img src="/loader.gif" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="Kiska Jutaa Loading..." /> : children}</>

}