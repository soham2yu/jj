"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Brain, BookOpen, BarChart3, Zap, Trophy, Target } from "lucide-react"
import { useUserStore } from "@/lib/store"

type DashboardView = "dashboard" | "learn" | "tests" | "progress" | "career" | "competitions"

interface SideNavigationProps {
  currentView: DashboardView
  onViewChange: (view: DashboardView) => void
}

export function SideNavigation({ currentView, onViewChange }: SideNavigationProps) {
  const logout = useUserStore((state) => state.logout)

  const navItems: { id: DashboardView; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <Zap className="w-5 h-5" /> },
    { id: "learn", label: "Learn", icon: <BookOpen className="w-5 h-5" /> },
    { id: "tests", label: "Tests", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "progress", label: "Progress", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "career", label: "Career Path", icon: <Target className="w-5 h-5" /> },
    { id: "competitions", label: "Competitions", icon: <Trophy className="w-5 h-5" /> },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-card to-card/50 border-r border-primary/20 flex flex-col glass-effect-strong">
      <div className="p-6 border-b border-primary/20 bg-gradient-to-r from-primary/20 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary-accent flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary-accent bg-clip-text text-transparent">SkillGraph</span>
        </div>
      </div>

      <nav className="flex-1 overflow-auto p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            variant={currentView === item.id ? "default" : "ghost"}
            className={`w-full justify-start gap-3 transition-smooth ${
              currentView === item.id
                ? "bg-gradient-primary-accent text-primary-foreground shadow-lg shadow-primary/30"
                : "text-foreground hover:bg-card/80 hover:border-primary/20"
            }`}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-primary/20 space-y-3">
        <Button
          onClick={() => logout()}
          variant="outline"
          className="w-full border-border/50 hover:bg-destructive/10 hover:border-destructive/50 transition-smooth"
        >
          Logout
        </Button>
        <p className="text-xs text-muted-foreground text-center">© 2026 SkillGraph AI</p>
      </div>
    </aside>
  )
}
