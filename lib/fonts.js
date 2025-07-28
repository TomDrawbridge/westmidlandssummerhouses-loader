
import localFont from 'next/font/local'
import { Inter, Outfit, Inconsolata } from 'next/font/google'

// Local fonts
export const clashGrotesk = localFont({
  src: '../public/fonts/ClashGrotesk-Variable.woff2',
  variable: '--font-clash-grotesk',
  display: 'swap',
})

export const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
})

// Google fonts
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
})