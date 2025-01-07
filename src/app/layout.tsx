import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hedera Token Tracker',
  description: 'Track Hedera tokens and their holders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'nonce-INTERNAL_NEXT_SCRIPT' 'strict-dynamic'" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
