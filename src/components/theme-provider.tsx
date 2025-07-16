"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

const themes = [
    "light", "dark", "system",
    "light-zinc", "dark-zinc",
    "light-blue", "dark-blue",
    "light-green", "dark-green",
    "light-orange", "dark-orange",
    "light-rose", "dark-rose",
    "light-purple", "dark-purple",
    "light-yellow", "dark-yellow",
    "light-cyan", "dark-cyan",
    "light-pink", "dark-pink",
    "light-slate", "dark-slate",
]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
        {...props} 
        attribute="class"
        themes={themes}
    >
        {children}
    </NextThemesProvider>
  )
}
