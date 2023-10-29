import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import AuthContextProvider from "@/providers/AuthProvider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'TCS',
  description: 'TCS Project',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <html lang="en">
      <body className={inter.className}>
      <main className="bg-gray-900 mx-auto md:h-screen">
        <Header/>
        <div className="flex flex-col items-center justify-center align-middle px-6 py-8 lg:py-0">
          {children}
        </div>
      </main>
      </body>
      </html>
    </AuthContextProvider>
  )
}
