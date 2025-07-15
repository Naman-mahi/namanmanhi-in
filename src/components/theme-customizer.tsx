"use client"

import * as React from "react"
import { Check, Cog, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const themes = [
  { name: "zinc", color: "bg-zinc-500" },
  { name: "blue", color: "bg-blue-500" },
  { name: "green", color: "bg-green-500" },
  { name: "orange", color: "bg-orange-500" },
  { name: "rose", color: "bg-rose-500" },
]

export function ThemeCustomizer() {
  const { setTheme: setMode, theme: mode } = useTheme()
  const [activeTheme, setActiveTheme] = React.useState('blue')

  React.useEffect(() => {
    const currentTheme = localStorage.getItem("theme-color") || "blue"
    setActiveTheme(currentTheme)
    document.body.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.body.classList.remove(className);
        }
    });
    document.body.classList.add(`theme-${currentTheme}`)
  }, [])

  const handleThemeChange = (themeName: string) => {
    document.body.classList.forEach(className => {
        if (className.startsWith('theme-')) {
            document.body.classList.remove(className);
        }
    });
    document.body.classList.add(`theme-${themeName}`)
    localStorage.setItem("theme-color", themeName)
    setActiveTheme(themeName)
  }

  return (
    <div className="fixed bottom-6 right-[calc(100vw-100%+6rem)] z-50">
       <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full w-14 h-14 shadow-2xl">
            <Cog className="h-6 w-6 animate-spin-slow" />
            <span className="sr-only">Customize Theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="space-y-4">
            <p className="font-medium text-sm">Theme</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setMode("light")}
                className={cn(mode === "light" && "border-2 border-primary")}
              >
                <Sun className="mr-1 -ml-1 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => setMode("dark")}
                 className={cn(mode === "dark" && "border-2 border-primary")}
              >
                <Moon className="mr-1 -ml-1 h-4 w-4" />
                Dark
              </Button>
               <Button
                variant={"outline"}
                size="sm"
                onClick={() => setMode("system")}
                className={cn(mode === "system" && "border-2 border-primary")}
              >
                System
              </Button>
            </div>
            
            <p className="font-medium text-sm">Color</p>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8 rounded-full",
                    activeTheme === theme.name && "border-2 border-primary"
                  )}
                  onClick={() => handleThemeChange(theme.name)}
                >
                  <span className={cn("h-4 w-4 rounded-full", theme.color)}>
                     {activeTheme === theme.name && <Check className="h-4 w-4 text-white" />}
                  </span>
                  <span className="sr-only">{theme.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
