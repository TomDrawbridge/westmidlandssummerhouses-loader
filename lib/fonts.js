
import localFont from 'next/font/local'
import { Inter, Outfit, Inconsolata } from 'next/font/google'

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

// Google fonts with optimized loading
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'optional', // Non-critical font
})

export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: false, // Don't preload unless critical
})

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'optional', // Non-critical font
})