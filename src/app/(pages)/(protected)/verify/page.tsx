'use client'
import authService from "@/appwrite/auth"
import { useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"
import { useState, useEffect } from "react"

export default function Verify() {
    const searchParams = useSearchParams()

    const [verifyStarted, setVerifyStarted] = useState<boolean>()
    const [verified, setVerified] = useState<boolean>(false)

    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')

    const sendEmail = async () => {
        const toastId = toast.loading('Sending the email... (Standby)')
        try {
            await authService.startVerification()
            toast.success("Successfully sent the email!", { id: toastId })
            setVerifyStarted(true)
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }

    }

    const verifyEmail = async () => {
        const toastId = toast.loading('Verifying the email...')
        if(!userId || !secret) return
        try {
            await authService.verifyUser(userId, secret)
            toast.success("Successfully verified the email...", { id: toastId })
            setVerifyStarted(false)
        } catch (error: any) {
            toast.error(error.message, { id: toastId })
        }
    }

    useEffect(() => {

        (async () => {
            try {
                const user = await authService.getCurrentUser()
                if (user?.emailVerification === true) {
                    setVerified(true)
                    return
                }
                if (!user || !secret) await sendEmail()
                else await verifyEmail()
            } catch (error) {
                console.log(error);
            }

        })()

    }, [userId, secret])


    return (
        <section className="px-8 my-8">
            {verifyStarted === false ? <h1 className="mx-auto text-center max-w-4xl text-3xl md:text-5xl text-green-500">Your account has been verified succesfully :)</h1>: <h1 className="mx-auto text-center max-w-4xl text-3xl md:text-5xl text-red-500">Click the link sent at your email address to verify your account :)</h1>}
            {verified && <h1 className="mx-auto text-center max-w-4xl text-3xl md:text-5xl text-green-500">Your account have already been verified :)</h1>}
        </section>
    )
}