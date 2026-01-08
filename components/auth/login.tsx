"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import { Brain, ArrowLeft } from "lucide-react"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const login = useUserStore((state) => state.login)
  const setViewHomepage = useUserStore((state) => state.setViewHomepage)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    login(email.split("@")[0])
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/20 to-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary-accent flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SkillGraph</h1>
              <p className="text-xs text-muted-foreground">AI Learning Platform</p>
            </div>
          </div>
          <button onClick={() => setViewHomepage(true)} className="p-2 hover:bg-card/50 rounded-lg transition-smooth">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <Card className="glass-effect-strong border-primary/20 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl bg-gradient-primary-accent bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription>Login to continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border/50 focus:border-primary/50 transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border/50 focus:border-primary/50 transition-smooth"
                />
              </div>

              {error && <p className="text-destructive text-sm animate-pulse">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-primary-accent hover:shadow-lg hover:shadow-primary/50 text-primary-foreground transition-smooth"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-muted-foreground text-sm">New to SkillGraph AI?</p>
              <p className="text-foreground text-sm">Use any email to continue. We'll guide you through onboarding.</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-xs mt-8">
          © 2026 SkillGraph AI. Empowering developers worldwide.
        </p>
      </div>
    </div>
  )
}
