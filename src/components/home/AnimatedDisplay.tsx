"use client"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedDisplay() {
    return (
        <div className="relative mt-16 overflow-hidden">
            <div className="flex justify-between items-center gap-8">
                <div className="hidden lg:block bg-black w-24 h-24 shadow-2xl rounded">
                    <img src="/images/shoe-4.png" alt="Shoe" className="object-cover" />
                </div>
                <div className="bg-black  w-24 h-24 md:w-48 md:h-48 shadow-2xl rounded">
                    <img src="/images/shoe-2.png" alt="Shoe" className="object-cover" />
                </div>
                <div className="bg-black w-48 h-48 md:w-72 md:h-72 shadow-2xl shadow-yellow-500 rounded">
                    <img src="/images/shoe-1.png" alt="Shoe" className="object-cover" />
                </div>
                <div className="bg-black  w-24 h-24 md:w-48 md:h-48 shadow-2xl rounded">
                    <img src="/images/shoe-3.png" alt="Shoe" className="object-cover" />
                </div>
                <div className="hidden lg:block bg-black w-24 h-24 shadow-2xl rounded">
                    <img src="/images/shoe-5.png" alt="Shoe" className="object-cover" />
                </div>
            </div>
        </div>
    )
}