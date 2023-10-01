import { Footer, Header } from '@/components'
import '../styles/globals.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header/>
        <main className='overflow-x-hidden'>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}