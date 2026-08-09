"use client"
import { SessionProvider } from "next-auth/react"
import { Chilanka } from "next/font/google"

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}