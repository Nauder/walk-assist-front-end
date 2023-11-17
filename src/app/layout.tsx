import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import AuthProvider from "@/providers/AuthProvider";
import Footer from "@/components/Footer";
import UsuarioProvider from "@/providers/UsuarioProvider";
import MessageProvider from "@/providers/MessageProvider";
import PontoProvider from "@/providers/PontoProvider";

const inter = Inter({
  fallback: ["Helvetica", "Arial", "sans-serif"],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'TCS',
  description: 'TCS Project',
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <MessageProvider>
        <UsuarioProvider>
          <PontoProvider>
            <html lang="en">
            <body className={inter.className}>
            <main
              className="bg-gray-950 bg-custom bg-cover bg-center bg-no-repeat mx-auto flex flex-col min-h-screen h-max">
              <Header/>
              <div className="flex flex-col grow items-center align-middle px-6 py-8 lg:py-0">
                {children}
              </div>
              <Footer/>
            </main>
            </body>
            </html>
          </PontoProvider>
        </UsuarioProvider>
      </MessageProvider>
    </AuthProvider>
  )
}
