"use client"
import React, { useState, useEffect } from "react"
import { AuthProvider } from "@/context/authContext"
import { AddressProvider } from "@/context/addressContext"
import { CartProvider } from "@/context/cartContext"
import authService from "@/appwrite/auth"
import Navbar from "@/components/Navbar"
import Loader from "@/components/Loader"
import Footer from "@/components/Footer"
import Cart from "@/components/Cart"
import { Toaster, toast } from "react-hot-toast"

import { CartItem } from "@/utils/types"

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [loader, setLoader] = useState(true);
    const [authStatus, setAuthStatus] = useState(false)
    const [address, setAddress] = useState<{
        fullname: string,
        address: string,
        city: string,
        state: string,
        pincode: string
    }>({
        fullname: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    })
    const [cart, setCart] = useState<Array<CartItem>>([])
    const [total, setTotal] = useState<number>(0)
    const [cartOpen, setCartOpen] = useState(false)

    const toggleCart = () => setCartOpen((prev) => !prev)
    const addToCart = (item: CartItem) => {
        const toastId = toast.loading('Adding the item...')

        setCart((prev) => [...prev, item])
        setTotal((prev) => (prev + item.price * item.quantity))

        toast.success('Successfully added to the cart!', { id: toastId })
    }
    const removeFromCart = (index: number) => {
        const toastId = toast.loading('Removing the item...')

        setTotal((prev) => (prev - cart[index].price * cart[index].quantity))
        setCart((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)])

        toast.success('Successfully removed the item from the cart!', { id: toastId })
    }
    const updateCart = (index: number, item: CartItem) => {
        setTotal((prev) => (prev - cart[index].price * cart[index].quantity + item.price * item.quantity))
        setCart((prev) => [...prev.slice(0, index), item, ...prev.slice(index + 1)])
     }

    useEffect(() => {
        authService.isLoggedIn().then(setAuthStatus).finally(() => setLoader(false))
        try {
            const localCart:Array<CartItem> = JSON.parse(localStorage.getItem('cart') || '[]')
            let localTotal:number = 0;
            if(!Array.isArray(localCart) || localCart.length===0) {
                localStorage.clear()
                return
            }
            setCart(localCart)
            localCart.forEach((item: any) => {
                localTotal += item.price * item.quantity
            })
            setTotal(localTotal)
        } catch (error) {
            console.error('I am an error! beware of me\n',error)
            localStorage.clear()
        }
    }, [])

    useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)) }, [cart])

    return (
        <AuthProvider value={{ authStatus, setAuthStatus }}>
            <CartProvider value={{ cart, total, toggleCart, addToCart, removeFromCart, updateCart }}>
                <AddressProvider value={{ address, setAddress }}>
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">
                            {loader && <Loader />}
                            {!loader && children}
                        </main>
                        <Footer />
                    </div>
                    {cartOpen && <Cart />}
                    <Toaster />
                </AddressProvider>
            </CartProvider>
        </AuthProvider>
    )
}
