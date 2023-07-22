import Link from "next/link"
import AnimatedDisplay from "./AnimatedDisplay"
import { Exo_2 } from "next/font/google"

const exo_2 = Exo_2({
    weight: '700',
    subsets: ['latin'],
})

export default function FirstSection() {
    return (
        <section className="max-h-screen px-4 py-2 sm:px-6 lg:px-8 mb-10">
            <div className="max-w-7xl mx-auto">
                <h1 className={"font-bold text-5xl lg:text-6xl text-center mt-2 " + exo_2.className}>Step into your own style with custom fit shoes</h1>
                <div className='flex justify-center gap-6 mt-6'>
                    <Link
                        href='/customize'
                        className="text-base font-medium rounded-lg p-3 shadow-2xl shadow-yellow-500 bg-yellow-500 hover:bg-yellow-500/80 text-white"
                    >
                        Customize your shoe
                    </Link>

                    <Link
                        href='/shop'
                        className="text-base font-medium rounded-lg p-3 shadow bg-black text-white hover:bg-black/80 "
                    >
                        Shop from existing designs
                    </Link>
                </div>
            </div>
            <AnimatedDisplay />
        </section>
    )
}