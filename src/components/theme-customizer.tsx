
"use client"

import * as React from "react"
import { Check, Cog, Laptop, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const colors = [
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
  const { setTheme: setNextTheme, theme: currentTheme = "system" } = useTheme();
  const [mode, setModeState] = React.useState("system");
  const [color, setColor] = React.useState("blue");

  React.useEffect(() => {
    // On mount, read from localStorage and set the initial state
    const savedMode = localStorage.getItem("theme-mode") || "dark";
    const savedColor = localStorage.getItem("theme-color") || "blue";
    setModeState(savedMode);
    setColor(savedColor);
    
    // Apply the initial theme
    if (savedMode === "system") {
      setNextTheme("system");
    } else {
      setNextTheme(`${savedMode}-${savedColor}`);
    }
  }, [setNextTheme]);

  const handleModeChange = (newMode: string) => {
    setModeState(newMode);
    localStorage.setItem("theme-mode", newMode);
    if (newMode === "system") {
      setNextTheme("system");
    } else {
      setNextTheme(`${newMode}-${color}`);
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("theme-color", newColor);
    const currentMode = localStorage.getItem("theme-mode") || "dark";
    if (currentMode !== "system") {
      setNextTheme(`${currentMode}-${newColor}`);
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 z-50">
       <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Cog className="h-6 w-6 animate-spin-slow" />
            <span className="sr-only">Customize Theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div>
              <p className="font-medium text-sm text-foreground mb-2">Mode</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => handleModeChange("light")}
                  className={cn(mode === "light" && "border-2 border-primary")}
                >
                  <Sun className="mr-2" /> Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => handleModeChange("dark")}
                  className={cn(mode === "dark" && "border-2 border-primary")}
                >
                  <Moon className="mr-2" /> Dark
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => handleModeChange("system")}
                  className={cn(mode === "system" && "border-2 border-primary")}
                >
                  <Laptop className="mr-2" /> System
                </Button>
              </div>
            </div>
            
            <div>
              <p className="font-medium text-sm text-foreground mb-2">Color</p>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((c) => (
                  <Button
                    key={c.name}
                    variant="outline"
                    size="icon"
                    className={cn(
                      "h-10 w-10 rounded-full",
                      color === c.name && "border-2 border-primary"
                    )}
                    onClick={() => handleColorChange(c.name)}
                  >
                    <span className={cn("h-6 w-6 rounded-full flex items-center justify-center", c.color)}>
                       {color === c.name && <Check className="h-4 w-4 text-white" />}
                    </span>
                    <span className="sr-only">{c.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
