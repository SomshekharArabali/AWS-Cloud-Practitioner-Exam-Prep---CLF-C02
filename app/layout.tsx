import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AWS Cloud Practitioner Exam Prep - CLF-C02",
  description:
    "Comprehensive AWS Cloud Practitioner exam preparation with 383+ practice questions, 11 question sets, and 10 structured modules. Created by Somashekhar Arabali.",
  keywords: "AWS, Cloud Practitioner, CLF-C02, exam prep, practice questions, certification",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
