import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import AuthContextProvider from "@/providers/AuthProvider";
import Footer from "@/components/Footer";

const inter = Inter({
    fallback: ["Helvetica", "Arial", "sans-serif"],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'TCS',
    description: 'TCS Project',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <AuthContextProvider>
            <html lang="en">
            <body className={inter.className}>
            <main className="bg-gray-900 mx-auto flex flex-col min-h-screen h-max">
                <Header/>
                <div className="flex flex-col grow items-center align-middle px-6 py-8 lg:py-0">
                    {children}
                </div>
                <Footer/>
            </main>
            </body>
            </html>
        </AuthContextProvider>
    )
}
