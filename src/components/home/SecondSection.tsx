import { Exo_2 } from "next/font/google"

const exo_2 = Exo_2({
    weight: '700',
    subsets: ['latin'],
})

export default function SecondSection() {
    return (
        <section className="h-screen relative overflow-hidden">
            <div className="h-3/4 bg-gradient-to-r from-neutral-800 to-black text-center flex items-center">
                <img src="/images/arrow-shoe.png" alt="Arrow shoe" className="absolute opacity-50 top-0 right-0 lg:scale-x-110" />
                <div className="flex mx-auto">
                    <img src="/logo-dark-transparent.png" alt="Kiska Jutaa Dark Logo" className="hidden md:block h-64 w-64 -mx-16 opacity-75"/>
                    <h3 className={"bg-gradient-to-r from-white to-yellow-500 text-transparent bg-clip-text w-full text-4xl md:text-6xl h-fit my-auto " + exo_2.className}> Crafted for greatness<br />Designed for victory</h3>
                </div>
            </div>
        </section>
    )
}