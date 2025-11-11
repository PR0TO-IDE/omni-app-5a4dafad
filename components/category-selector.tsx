'use client'

import * as React from 'react'
import { useCategories } from '@/components/category-context'
import { useTheme } from '@/components/theme-provider'
import { CategoryColor, CATEGORY_COLORS } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Check } from 'lucide-react'

export function CategorySelector({ 
  selectedCategoryId, 
  onSelectCategory 
}: { 
  selectedCategoryId?: string
  onSelectCategory: (categoryId: string) => void
}) {
  const { categories } = useCategories()
  const { theme } = useTheme()
  const [showDropdown, setShowDropdown] = React.useState(false)

  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId)

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full justify-between"
      >
        {selectedCategory ? (
          <>
            <Badge 
              variant="secondary"
              className={`mr-2 ${CATEGORY_COLORS[selectedCategory.color as CategoryColor][
                theme === 'dark' ? 'dark' : 'light'
              ]}`}
            >
              {selectedCategory.name}
            </Badge>
          </>
        ) : (
          'Select Category'
        )}
        <Plus className="h-4 w-4 ml-2" />
      </Button>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id)
                setShowDropdown(false)
              }}
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Badge 
                className={CATEGORY_COLORS[category.color as CategoryColor][
                  theme === 'dark' ? 'dark' : 'light'
                ]}
              >
                {category.name}
              </Badge>
              {selectedCategoryId === category.id && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}