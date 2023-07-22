import { Exo_2 } from "next/font/google"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'


const exo_2 = Exo_2({
    weight: '700',
    subsets: ['latin'],
})

export default function ThirdSection() {
    return (
        <section className="w-11/12 mx-auto">
            <h3 className={"text-5xl text-center " + exo_2.className}>Or choose from our collection... 👟</h3>
            <div className="flex flex-nowrap lg:grid lg:grid-cols-4 w-full items-center py-8 gap-6 overflow-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Link href="/shop" key={i}>
                        <div className="relative min-h-[400px] min-w-[250px] lg:min-h-[350px] lg:min-w-[200px] rounded-md">
                            <img
                                src="/images/shoe-7.png"
                                alt="Shoe Images"
                                className="z-0 h-full w-full rounded-md object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-left right-4">
                                <div className="flex justify-between w-full">
                                    <h1 className="text-lg font-semibold text-white">Rs. 969 <span className="text-sm font-thin">(only)</span> </h1>

                                    <Link href="/shop" className="inline-flex cursor-pointer items-center font-semibold text-white">
                                        Buy Now &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                <Link
                    href="/shop"
                    className="lg:hidden inline-flex items-center rounded-full px-6 py-6 w-32 h-32 font-semibold bg-black text-white"
                >
                    Explore More
                    <ArrowRight className="h-8 w-8" />
                </Link>
            </div>
            <Link
                href="/shop"
                className="hidden transition lg:flex w-fit ml-auto items-center rounded-md px-6 py-4 font-semibold hover:bg-black hover:text-white"
            >
                Explore More
                <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </section>
    )
}
