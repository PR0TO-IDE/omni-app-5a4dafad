'use client'

import * as React from 'react'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Check 
} from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const themes = [
    { value: 'light', name: 'Light', icon: Sun },
    { value: 'dark', name: 'Dark', icon: Moon },
    { value: 'system', name: 'System', icon: Monitor },
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {theme === 'light' && <Sun className="h-5 w-5" />}
        {theme === 'dark' && <Moon className="h-5 w-5" />}
        {theme === 'system' && <Monitor className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-md border bg-popover shadow-lg z-50">
          <div className="p-2">
            {themes.map(({ value, name, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value as any)
                  setIsOpen(false)
                }}
                className="flex items-center w-full px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4 mr-2" />
                {name}
                {theme === value && (
                  <Check className="h-4 w-4 ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}