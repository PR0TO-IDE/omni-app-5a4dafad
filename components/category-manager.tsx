'use client'

import * as React from 'react'
import { useCategories } from '@/components/category-context'
import { useTheme } from '@/components/theme-provider'
import { CategoryColor, CATEGORY_COLORS } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Check, X } from 'lucide-react'

export function CategoryManager() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { theme } = useTheme()
  const [isAdding, setIsAdding] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState<CategoryColor>('blue')
  const [newName, setNewName] = React.useState('')
  const [newColor, setNewColor] = React.useState<CategoryColor>('blue')

  const handleAddCategory = () => {
    if (name.trim()) {
      addCategory(name, color)
      setName('')
      setColor('blue')
      setIsAdding(false)
    }
  }

  const handleEditCategory = (category: any) => {
    setEditingId(category.id)
    setNewName(category.name)
    setNewColor(category.color)
  }

  const handleSaveEdit = () => {
    if (editingId && newName.trim()) {
      updateCategory(editingId, newName, newColor)
      setEditingId(null)
      setNewName('')
      setNewColor('blue')
    }
  }

  const colors: CategoryColor[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink', 'gray']

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          className={isAdding ? 'hidden' : ''}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {isAdding && (
        <div className="space-y-3 p-4 border rounded-lg">
          <Input
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <div className="flex flex-wrap gap-2">
            {colors.map((colorOption) => (
              <button
                key={colorOption}
                onClick={() => setColor(colorOption)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  color === colorOption ? 'ring-2 ring-primary' : ''
                } ${CATEGORY_COLORS[colorOption][theme === 'dark' ? 'dark' : 'light']}`}
              >
                {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddCategory}>Add Category</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
            {editingId === category.id ? (
              <div className="flex-1 space-y-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                />
                <div className="flex flex-wrap gap-2">
                  {colors.map((colorOption) => (
                    <button
                      key={colorOption}
                      onClick={() => setNewColor(colorOption)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        newColor === colorOption ? 'ring-2 ring-primary' : ''
                      } ${CATEGORY_COLORS[colorOption][theme === 'dark' ? 'dark' : 'light']}`}
                    >
                      {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Badge 
                  className={CATEGORY_COLORS[category.color as CategoryColor][
                    theme === 'dark' ? 'dark' : 'light'
                  ]}
                >
                  {category.name}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCategory(category.id)}
                    className="text-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}