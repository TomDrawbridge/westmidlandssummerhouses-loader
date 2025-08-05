
import localFont from 'next/font/local'
import { Inter, Outfit } from 'next/font/google'

// Local fonts with optimized loading
export const clashGrotesk = localFont({
  src: '../public/fonts/ClashGrotesk-Variable.woff2',
  variable: '--font-clash-grotesk',
  display: 'swap',
  preload: true, // Preload critical font
})

export const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  preload: true, // Preload critical font
})



export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap'
})
