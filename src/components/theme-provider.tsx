"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // On initial load, apply the saved color theme from localStorage, defaulting to 'blue'
    const storedTheme = localStorage.getItem("theme-color") || "blue";
    document.body.classList.forEach(className => {
      if (className.startsWith('theme-')) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(`theme-${storedTheme}`);
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
