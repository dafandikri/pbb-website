import './globals.css'

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
      <body className="bg-[#f6f2ea] text-[#111111]">
        {children}
      </body>
    </html>
  )
}
