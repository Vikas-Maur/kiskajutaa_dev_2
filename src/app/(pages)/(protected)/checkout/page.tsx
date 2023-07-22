'use client'

import React, { useEffect } from "react"
import useCart from "@/context/useCart";
import useAddress from "@/context/useAddress";
import { useRouter } from "next/navigation";
import FinalOrder from "@/components/checkout/FinalOrder";

const CheckoutPage: React.FC = () => {
    const { cart } = useCart()
    const { address } = useAddress()
    const router = useRouter()

    useEffect(() => {
        if (cart.length === 0) {
            router.replace('/shop')
        }

        if (address.address === '' || address.city === '' || address.fullname === '' || address.pincode === '' || address.state === '') {
            router.replace('/shippingaddress')
        }
    })
    return (
        <section>
            <FinalOrder cart={cart} address={address} />
        </section>
    )
}
export default CheckoutPage