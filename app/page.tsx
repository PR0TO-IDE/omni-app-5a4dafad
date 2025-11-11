import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full p-8 bg-gray-900 border-gray-800">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            Test app
          </h1>
          <p className="text-gray-400">
            Welcome to your new mobile app
          </p>
          <Button className="w-full">
            Get Started
          </Button>
        </div>
      </Card>
    </main>
  )
}