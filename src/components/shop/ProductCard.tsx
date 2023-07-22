'use client'

import databaseService from "@/appwrite/database"
import { useEffect, useState, FormEvent } from "react"
import useCart from "@/context/useCart"
import { CartItem } from "@/utils/types"
import { Models } from "appwrite"
import { SHOE_SIZES } from "@/utils/utils"

type Props = {
    id: any
}

const ProductCard: React.FC<Props> = ({ id }) => {
    const { addToCart, toggleCart } = useCart()
    const [item, setItem] = useState<CartItem>({
        id: id,
        quantity: 1,
        size: 4,
        price: NaN,
        imageSrc: ''
    })

    const [error, setError] = useState<boolean>(false)

    const submittingForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addToCart(item)
        toggleCart()
    }

    useEffect(() => {
        (async () => {
            const product = await databaseService.readProduct(id)
            if (!product) { setError(true); return }
            setItem((prev) => ({ ...prev, price: product.price, imageSrc: product.imageSrc }))
        })()
    }, [])

    return (
        <div className="max-h-full max-w-6xl p-8 rounded overflow-auto mx-auto">
            <div className="flex justify-between items-center gap-8">
                <h3 className="text-2xl font-bold text-gray-900">Product</h3>
            </div>
            <div className="flex flex-col lg:flex-row mt-8 gap-4 lg:gap-12">
                <div className="cursor-pointer w-full max-w-xs bg-white rounded-md transition-all hover:shadow-2xl hover:scale-110">
                    {item.imageSrc===''? <div className="animate-pulse bg-black/25 w-64 h-64"></div> :<img
                        src={item.imageSrc}
                        alt={`Kiska Jutaa #${item.id}`}
                        className="w-full h-full rounded-md object-fit"
                    />}
                </div>
                <div className="">
                    <h1 className="text-3xl font-bold">Kiska.Jutaa?</h1>
                    <form onSubmit={submittingForm} className="mt-4">
                        <div className="border-b-2 border-gray-100 pb-4 flex gap-8">
                            <div className="flex justify-between items-center gap-3">
                                <label htmlFor="productquantity" className="font-semibold">Quantity: </label>
                                <input required min={1} value={item.quantity} onChange={(e) => { setItem((prev) => ({ ...prev, quantity: parseInt(e.target.value) })) }} type="number" name="productquantity" id="productquantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5 w-14" />
                            </div>
                            <div className="flex justify-between items-center gap-3">
                                <label htmlFor="productsize" className="font-semibold">Size: </label>
                                <select required onChange={(e) => { setItem((prev) => ({ ...prev, size: parseInt(e.target.value) })) }} name="productsize" id="productsize" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5">
                                    {SHOE_SIZES.map((size) => {
                                        return <option value={size} key={size}>{size}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <span className="title-font text-xl font-bold text-gray-900">Rs.{Number.isNaN(item.price)? '': item.price}</span>
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
    )
}

export default ProductCard