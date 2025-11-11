import { TodoList } from '@/components/todo-list'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="flex min-h-screen flex-col p-6">
        <div className="max-w-md mx-auto w-full">
          <TodoList />
        </div>
      </main>
    </div>
  )
}