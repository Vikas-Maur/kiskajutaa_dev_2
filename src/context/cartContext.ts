import { CartItem, CartType } from "@/utils/types";
import { createContext } from "react";

export const CartContext = createContext<{
    cart: CartType;
    total: number;
    toggleCart: () => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (index: number) => void;
    updateCart: (index: number, item: CartItem) => void;
}>({
    cart: {
        email: "",
        productIds: [],
        price: [],
        quantity: [],
        size: [],
        address: "",
        message: "",
    },
    total: 0,
    toggleCart: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    updateCart: () => { },
});

export const CartProvider = CartContext.Provider;

export default CartContext;