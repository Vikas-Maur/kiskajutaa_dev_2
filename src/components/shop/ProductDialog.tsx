import { Models } from "appwrite"
import React, { FormEvent, useState } from "react"
import useCart from "@/context/useCart"
import { X, ChevronDown } from 'lucide-react'
import { CartItem } from "@/utils/types"
import { SHOE_SIZES } from "@/utils/utils"

type Props = {
    product: Models.Document;
    index: number;
    toggleProduct: () => void;
}

const ProductDialog: React.FC<Props> = ({ product, index, toggleProduct }) => {
    const [item, setItem] = useState({
        pId: product.$id,
        price: product.price,
        quantity: 1,
        size: 4
    })

    const { addToCart, toggleCart } = useCart()

    const submittingForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addToCart(item)
        // toggleProduct()
        // toggleCart()
    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
            <div onClick={toggleProduct} className="absolute top-0 left-0 w-full h-full bg-black/25 backdrop-filter backdrop-blur"></div>
            <div className="max-h-full max-w-full p-8 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white shadow-2xl mx-auto">
                <div className="flex justify-between items-center gap-8">
                    <h3 className="text-2xl font-bold text-gray-900">Product</h3>
                    <button onClick={toggleProduct} className="block rounded p-2 hover:bg-gray-100"><X /></button>
                </div>
                <div className="flex flex-col lg:flex-row mt-8 gap-4">
                    <div className="cursor-pointer w-full max-w-xs bg-white rounded-md transition-all hover:shadow-2xl hover:scale-110">
                        <img
                            src={product.imageSrc}
                            alt={`Kiska Jutaa #${index + 1}`}
                            className="w-full h-full rounded-md object-fit"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Kiska.Jutaa?</h1>
                        <form onSubmit={submittingForm} className="mt-4">
                            <div className="border-b-2 border-gray-100 pb-4 flex gap-8">
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="productquantity" className="font-semibold">Quantity: </label>
                                    <input value={item.quantity} onChange={(e) => { setItem((prev) => ({ ...prev, quantity: parseInt(e.target.value) })) }} required type="number" name="productquantity" id="productquantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-14" />
                                </div>
                                <div className="flex justify-between items-center gap-3">
                                    <label htmlFor="productsize" className="font-semibold">Size: </label>
                                    <select onChange={(e) => { setItem((prev) => ({ ...prev, size: parseInt(e.target.value) })) }} required name="productsize" id="productsize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5">
                                        {SHOE_SIZES.map((size) => {
                                            return <option value={size} key={size}>{size}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-8">
                                <span className="title-font text-xl font-bold text-gray-900">Rs.{product.price}</span>
                                <button
                                    type="submit"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDialog


