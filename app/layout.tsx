import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CategoryProvider } from "@/components/category-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Test app",
  description: "Mobile app built with Omni",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CategoryProvider>
            <div className="min-h-screen bg-background">
              <div className="mx-auto max-w-md">
                {children}
              </div>
            </div>
          </CategoryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}