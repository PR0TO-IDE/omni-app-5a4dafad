'use client'

import * as React from 'react'
import { Category, Item, CategoryColor } from '@/lib/types'

type CategoryContextType = {
  categories: Category[]
  items: Item[]
  addCategory: (name: string, color: CategoryColor) => void
  updateCategory: (id: string, name: string, color: CategoryColor) => void
  deleteCategory: (id: string) => void
  addItem: (title: string, description?: string, categoryId?: string) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  deleteItem: (id: string) => void
}

const CategoryContext = React.createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [items, setItems] = React.useState<Item[]>([])
  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useEffect(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      const savedCategories = localStorage.getItem('categories')
      const savedItems = localStorage.getItem('items')
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories))
      } else {
        // Initialize with default categories
        const defaultCategories: Category[] = [
          {
            id: '1',
            name: 'Personal',
            color: 'blue',
            createdAt: new Date()
          },
          {
            id: '2',
            name: 'Work',
            color: 'green',
            createdAt: new Date()
          },
          {
            id: '3',
            name: 'Shopping',
            color: 'orange',
            createdAt: new Date()
          }
        ]
        setCategories(defaultCategories)
        localStorage.setItem('categories', JSON.stringify(defaultCategories))
      }
      
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
      
      setIsInitialized(true)
    }
  }, [])

  React.useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  }, [categories, isInitialized])

  React.useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('items', JSON.stringify(items))
    }
  }, [items, isInitialized])

  const addCategory = React.useCallback((name: string, color: CategoryColor) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      color,
      createdAt: new Date()
    }
    setCategories(prev => [...prev, newCategory])
  }, [])

  const updateCategory = React.useCallback((id: string, name: string, color: CategoryColor) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, name, color } : cat
    ))
  }, [])

  const deleteCategory = React.useCallback((id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id))
    setItems(prev => prev.filter(item => item.categoryId !== id))
  }, [])

  const addItem = React.useCallback((title: string, description?: string, categoryId?: string) => {
    const newCategory = categoryId || categories[0]?.id
    const newItem: Item = {
      id: Date.now().toString() + Math.random().toString(),
      title,
      description,
      categoryId: newCategory || '',
      createdAt: new Date(),
      completed: false
    }
    setItems(prev => [...prev, newItem])
  }, [categories])

  const updateItem = React.useCallback((id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }, [])

  const deleteItem = React.useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const value = {
    categories,
    items,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem
  }

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  const context = React.useContext(CategoryContext)
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider')
  }
  return context
}