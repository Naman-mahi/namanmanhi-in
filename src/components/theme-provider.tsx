"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const themeColor = localStorage.getItem("theme-color") || "blue";
    if (document.body.className.includes("theme-")) {
        document.body.className = document.body.className.replace(/theme-\w+/g, `theme-${themeColor}`);
    } else {
        document.body.classList.add(`theme-${themeColor}`);
    }
  }, [])
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
