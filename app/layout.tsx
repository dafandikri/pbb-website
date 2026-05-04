import './globals.css'
import {Header} from '@/components/layout/Header'
import {Footer} from '@/components/layout/Footer'

export const metadata = {
  title: 'Partai Bulan Bintang',
  description: 'Profil dan aktivitas Partai Bulan Bintang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-[#f6f2ea] text-[#111111]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
