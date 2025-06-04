"use client";   
import { Sun, Moon, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else if (theme === 'dark') {
            setTheme('system')
        } else {
            setTheme('light')
        }
    }

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun className="h-5 w-5" />
            case 'dark':
                return <Moon className="h-5 w-5" />
            default:
                return <Computer className="h-5 w-5" />
        }
    }

    const getTooltip = () => {
        switch (theme) {
            case 'light':
                return 'Switch to dark theme'
            case 'dark':
                return 'Switch to system theme'
            default:
                return 'Switch to light theme'
        }
    }
    
    return (
        <div className="fixed bottom-4 left-4 z-50">
            <button
                onClick={cycleTheme}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                title={getTooltip()}
                aria-label={getTooltip()}
            >
                {getIcon()}
            </button>
        </div>    
    )
}