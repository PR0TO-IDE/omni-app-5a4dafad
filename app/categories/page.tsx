import { CategoryManager } from '@/components/category-manager'
import { ThemeToggle } from '@/components/theme-toggle'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="flex min-h-screen flex-col p-6">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Category Manager</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage categories for organizing your items
            </p>
          </div>
          
          <CategoryManager />
        </div>
      </main>
    </div>
  )
}