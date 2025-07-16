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
  { name: "purple", color: "bg-purple-500" },
  { name: "yellow", color: "bg-yellow-500" },
  { name: "cyan", color: "bg-cyan-500" },
  { name: "pink", color: "bg-pink-500" },
  { name: "slate", color: "bg-slate-500" },
]

export function ThemeCustomizer() {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme()
  const [activeTheme, setActiveTheme] = React.useState('blue')

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme-color") || "blue";
    handleThemeChange(storedTheme, false);
  }, []);

  const handleThemeChange = (themeName: string, save = true) => {
    document.body.classList.forEach(className => {
      if (className.startsWith('theme-')) {
        document.body.classList.remove(className);
      }
    });
    document.body.classList.add(`theme-${themeName}`);
    setActiveTheme(themeName);
    if (save) {
      localStorage.setItem("theme-color", themeName);
    }
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 z-50">
       <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full w-14 h-14 shadow-2xl">
            <Cog className="h-6 w-6 animate-spin-slow" />
            <span className="sr-only">Customize Theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
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
            </div>
            
            <p className="font-medium text-sm">Color</p>
            <div className="grid grid-cols-5 gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-full",
                    activeTheme === theme.name && "border-2 border-primary"
                  )}
                  onClick={() => handleThemeChange(theme.name)}
                >
                  <span className={cn("h-6 w-6 rounded-full flex items-center justify-center", theme.color)}>
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
