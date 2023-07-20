import './globals.css'
import type { Metadata } from 'next'
import {Poppins} from "next/font/google"

export const metadata: Metadata = {
  title: 'Kiska.Jutaa',
  description: 'KiskaJutaa',
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'max-w-screen overflow-x-hidden ' + poppins.className}>{children}</body>
    </html>
  )
}
