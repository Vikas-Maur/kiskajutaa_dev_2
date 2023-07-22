'use client'

import authService from "@/appwrite/auth";
import React, { useState } from "react";
import { notFound } from "next/navigation"
import NotFound from "@/components/NotFound";

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loader, setLoader] = useState<boolean>(true)
    const [notFoundError, setNotFoundError] = useState<boolean>(false)

    authService.isKiskaJutaaTeam().then((resp) => {
        if (!resp) {
            setNotFoundError(true)
            notFound()
        }
    }).finally(() => setLoader(false))


    return <>{loader ? <img src="/loader.gif" className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="Kiska Jutaa Loading..." /> : (notFoundError? <NotFound /> : children)}</>

}