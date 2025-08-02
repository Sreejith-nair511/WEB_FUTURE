import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AdAstra - Rise Above. Build Beyond.",
  description:
    "The official Robotics & Drone Club of CIT – where innovation takes flight across Bharat. Join India's premier robotics community.",
  keywords: "robotics, drones, AI, engineering, India, innovation, technology, college club, automation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
