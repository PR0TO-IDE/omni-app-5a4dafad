'use client'

import * as React from 'react'
import { useCategories } from '@/components/category-context'
import { useTheme } from '@/components/theme-provider'
import { CategoryColor, CATEGORY_COLORS } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Check, X, Square, CheckSquare } from 'lucide-react'

export function TodoList() {
  const { 
    categories, 
    items, 
    addItem, 
    updateItem, 
    deleteItem
  } = useCategories()
  const { theme } = useTheme()
  
  const [newTitle, setNewTitle] = React.useState('')
  const [newDescription, setNewDescription] = React.useState('')
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>('')
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editTitle, setEditTitle] = React.useState('')
  const [editDescription, setEditDescription] = React.useState('')
  const [editCompleted, setEditCompleted] = React.useState(false)

  React.useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id)
    }
  }, [categories, selectedCategoryId])

  const handleAddItem = () => {
    if (newTitle.trim() && selectedCategoryId) {
      addItem(newTitle, newDescription || undefined, selectedCategoryId)
      setNewTitle('')
      setNewDescription('')
    }
  }

  const handleEditItem = (item: any) => {
    setEditingId(item.id)
    setEditTitle(item.title)
    setEditDescription(item.description || '')
    setEditCompleted(item.completed)
  }

  const handleSaveEdit = () => {
    if (editingId) {
      updateItem(editingId, {
        title: editTitle,
        description: editDescription,
        completed: editCompleted
      })
      setEditingId(null)
      setEditTitle('')
      setEditDescription('')
      setEditCompleted(false)
    }
  }

  const handleToggleComplete = (item: any) => {
    updateItem(item.id, { completed: !item.completed })
  }

  const filteredItems = items.filter(item => item.categoryId === selectedCategoryId)
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId)

  if (categories.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <div className="text-center py-8 text-muted-foreground">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Todo List</h2>
        
        {/* Category Selector */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Category
          </label>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategoryId === category.id
                    ? 'ring-2 ring-primary'
                    : 'hover:bg-accent hover:text-accent-foreground'
                } ${CATEGORY_COLORS[category.color as CategoryColor][
                  theme === 'dark' ? 'dark' : 'light'
                ]}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Add New Item */}
        <div className="space-y-3">
          <Input
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <Textarea
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={2}
          />
          <Button onClick={handleAddItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Current Category Info */}
      {selectedCategory && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing tasks for:</span>
          <Badge 
            className={CATEGORY_COLORS[selectedCategory.color as CategoryColor][
              theme === 'dark' ? 'dark' : 'light'
            ]}
          >
            {selectedCategory.name}
          </Badge>
          <span>({filteredItems.length} tasks)</span>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tasks yet. Add one above!
          </div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              {editingId === item.id ? (
                <div className="space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  />
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editCompleted}
                      onChange={(e) => setEditCompleted(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm">Completed</span>
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
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleComplete(item)}
                      className="mt-0.5"
                    >
                      {item.completed ? (
                        <CheckSquare className="h-5 w-5 text-green-500" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        item.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className={`text-sm mt-1 ${
                          item.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'
                        }`}>
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                        className="text-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}