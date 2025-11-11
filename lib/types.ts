export interface Category {
  id: string
  name: string
  color: string
  createdAt: Date
}

export interface Item {
  id: string
  title: string
  description?: string
  categoryId: string
  createdAt: Date
  completed: boolean
}

export type CategoryColor = 
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'

export const CATEGORY_COLORS: Record<CategoryColor, { light: string; dark: string }> = {
  red: {
    light: 'bg-red-100 text-red-800',
    dark: 'bg-red-900 text-red-100'
  },
  orange: {
    light: 'bg-orange-100 text-orange-800',
    dark: 'bg-orange-900 text-orange-100'
  },
  yellow: {
    light: 'bg-yellow-100 text-yellow-800',
    dark: 'bg-yellow-900 text-yellow-100'
  },
  green: {
    light: 'bg-green-100 text-green-800',
    dark: 'bg-green-900 text-green-100'
  },
  blue: {
    light: 'bg-blue-100 text-blue-800',
    dark: 'bg-blue-900 text-blue-100'
  },
  indigo: {
    light: 'bg-indigo-100 text-indigo-800',
    dark: 'bg-indigo-900 text-indigo-100'
  },
  purple: {
    light: 'bg-purple-100 text-purple-800',
    dark: 'bg-purple-900 text-purple-100'
  },
  pink: {
    light: 'bg-pink-100 text-pink-800',
    dark: 'bg-pink-900 text-pink-100'
  },
  gray: {
    light: 'bg-gray-100 text-gray-800',
    dark: 'bg-gray-900 text-gray-100'
  }
}