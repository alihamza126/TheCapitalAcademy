import type { Metadata } from 'next'
import { Instrument_Sans, Inter } from 'next/font/google'
import './global.css'
import GlobalProvider from './GlobalProvider'
import { Toaster } from 'react-hot-toast'
import { HeroUIProvider } from "@heroui/react";


const instrument = Instrument_Sans({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'The capital academy',
  description: 'The capital academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <GlobalProvider>
      <html lang="en">
        <HeroUIProvider>
          <Toaster />
          <body className={inter.className}>
            {children}
          </body>
        </HeroUIProvider>
      </html>
    </GlobalProvider>
  )
}
