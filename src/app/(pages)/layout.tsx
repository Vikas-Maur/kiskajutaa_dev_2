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

import { CartItem, CartType } from "@/utils/types"

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
    const [cart, setCart] = useState<CartType>({
        email: "",
        productIds: [],
        price: [],
        quantity: [],
        size: [],
        address: "",
        message: "",
    })
    const [total, setTotal] = useState<number>(0)
    const [cartOpen, setCartOpen] = useState(false)

    const toggleCart = () => setCartOpen((prev) => !prev)
    const addToCart = ({pId, price, quantity, size}: CartItem) => {
        const toastId = toast.loading("Adding to cart....")
        setTotal((amt) => amt + price*quantity)
        setCart((prev)=>({
            ...prev, 
            productIds: [...prev.productIds, pId],
            price: [...prev.price, price],
            quantity: [...prev.quantity, quantity],
            size: [...prev.size, size],
        }))
        toast.success("Successfully added to cart!", {id: toastId})
    }

    const removeFromCart = (index: number) => {
        const toastId = toast.loading("Removing the item from cart....")
        setTotal((amt) => amt - cart.price[index]*cart.quantity[index])
        setCart((prev)=>({
            ...prev, 
            productIds: [...prev.productIds.slice(0, index), ...prev.productIds.slice(index+1)],
            price: [...prev.price.slice(0, index), ...prev.price.slice(index+1)],
            quantity: [...prev.quantity.slice(0, index), ...prev.quantity.slice(index+1)],
            size: [...prev.size.slice(0, index), ...prev.size.slice(index+1)],
        }))
        toast.success("Successfully removed the item from cart!", {id: toastId})
    }

    const updateCart = (index: number, {pId, price, quantity, size}: CartItem) => {
        const toastId = toast.loading("Updating the item....")
        setTotal((amt) => amt - cart.price[index]*cart.quantity[index])
        setCart((prev)=>({
            ...prev, 
            productIds: [...prev.productIds.slice(0, index), pId, ...prev.productIds.slice(index+1)],
            price: [...prev.price.slice(0, index), price, ...prev.price.slice(index+1)],
            quantity: [...prev.quantity.slice(0, index), quantity, ...prev.quantity.slice(index+1)],
            size: [...prev.size.slice(0, index), size, ...prev.size.slice(index+1)],
        }))
        setTotal((amt) => amt + cart.price[index]*cart.quantity[index])
        toast.success("Successfully updated the cart!", {id: toastId})

    }

    useEffect(() => {
        authService.isLoggedIn().then(setAuthStatus).finally(() => setLoader(false))
        const cart = localStorage.getItem('cart')
        if(cart!==null) setCart(JSON.parse(cart))

        const total = localStorage.getItem('total')
        if(total!==null) setTotal(parseInt(total))

    }, [])

    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("total", total.toString())
    }, [cart])

    useEffect(()=>{
        if(!authStatus) {
            setCart((prev)=>({...prev, email: ''}));
            return
        }
        (async () => {
            const userData = await authService.getCurrentUser()
            if (userData) {
                setCart((prev)=>({...prev, email: userData.email}))
            }
        })()
        
    }, [authStatus])

    return (
        <AuthProvider value={{ authStatus, setAuthStatus }}>
            <CartProvider value={{ cart, total, toggleCart, addToCart, removeFromCart, updateCart}}>
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
