'use client'
import databaseService from "@/appwrite/database";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import ProductDialog from "./ProductDialog";

export default function AllProducts() {
    const [products, setProducts] = useState<Array<Models.Document>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [curProd, setCurProd] = useState<number>(0)
    const [showingOneProd, setShowingOneProd] = useState<boolean>(false)

    const toggleProduct = () => setShowingOneProd((prev) => !prev) 
    const displayProduct = (index: number) => {
        setCurProd(index)
        toggleProduct()
    }

    useEffect(() => {
        (async () => {
            const data = await databaseService.readAllProducts()
            if (!data) return;
            setProducts([...data.documents, ...data.documents, ...data.documents, ...data.documents, ...data.documents])
            setLoading(false)
        })()
    }, [])

    return (
        <div className="mx-auto p-8 w-full max-w-6xl">
            <h1 className="rounded bg-black text-white p-4 text-3xl md:text-5xl text-center font-bold">Shop from existing design... 👟</h1>
            {loading ? <img src="/Loader.gif" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> : (
                <div className="mt-3 w-full flex justify-evenly items-center gap-12 flex-wrap">
                    {products.map((product, i) => (
                        <div key={i} onClick={() => displayProduct(i)} className="cursor-pointer max-w-xs bg-white rounded-md shadow-lg transition-all hover:shadow-2xl hover:scale-110">
                            <img
                                src={product.imageSrc}
                                alt={`Kiska Jutaa #${i + 1}`}
                                className="w-full rounded-md object-fit"
                            />
                        </div>
                    ))}
                </div>
            )}
            {showingOneProd && <ProductDialog index={curProd} toggleProduct={toggleProduct} product={products[curProd]} />}
        </div>
    )
}