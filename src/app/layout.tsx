import "./globals.css"
import { Metadata } from "next"
import { Noto_Sans_JP, Roboto } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: "ススミダス職業登録者一覧",
  description: "susumidasu List of occupational registrants ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  )
}