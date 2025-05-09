import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../../styles/globals.css'
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'English Together',
  description: '영어 학습을 돕는 프로그램입니다.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
