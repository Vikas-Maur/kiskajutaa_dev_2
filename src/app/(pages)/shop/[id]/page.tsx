import ProductCard from "@/components/shop/ProductCard"

const ProductPage = ({params}: any) => {
    return (
        <section className="p-8 flex items-center justify-center">
            <ProductCard id={params.id} />
        </section>
    )
}

export default ProductPage