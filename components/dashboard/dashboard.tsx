"use client"

import { useState } from "react"
import { useUserStore } from "@/lib/store"
import { SideNavigation } from "./side-navigation"
import { LearnModule } from "./learn-module"
import { TestSection } from "./test-section"
import { ProgressSection } from "./progress-section"
import { CareerPath } from "./career-path"
import { CompetitionSection } from "./competition-section"

type DashboardView = "dashboard" | "learn" | "tests" | "progress" | "career" | "competitions"

export function Dashboard() {
  const [currentView, setCurrentView] = useState<DashboardView>("dashboard")
  const username = useUserStore((state) => state.username)
  const completedChapters = useUserStore((state) => state.completedChapters)

  return (
    <div className="flex h-screen bg-background">
      <SideNavigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-card/80 backdrop-blur border-b border-border/50 px-8 py-4 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome, {username}</h1>
              <p className="text-muted-foreground text-sm">
                {completedChapters.length} chapters completed • Keep building your skills
              </p>
            </div>
          </div>
        </header>

        <div className="p-8">
          {currentView === "dashboard" && <DashboardHome />}
          {currentView === "learn" && <LearnModule />}
          {currentView === "tests" && <TestSection />}
          {currentView === "progress" && <ProgressSection />}
          {currentView === "career" && <CareerPath />}
          {currentView === "competitions" && <CompetitionSection />}
        </div>
      </main>
    </div>
  )
}

function DashboardHome() {
  const completedChapters = useUserStore((state) => state.completedChapters)
  const testScores = useUserStore((state) => state.testScores)
  const currentAssessmentScore = useUserStore((state) => state.currentAssessmentScore)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Chapters Completed</p>
          <p className="text-4xl font-bold text-primary">{completedChapters.length}/10</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Initial Assessment</p>
          <p className="text-4xl font-bold text-accent">{Math.round(currentAssessmentScore ?? 0)}%</p>
        </div>
        <div className="bg-card border border-border/50 rounded-lg p-6">
          <p className="text-muted-foreground text-sm mb-2">Tests Completed</p>
          <p className="text-4xl font-bold text-secondary">{Object.keys(testScores).length}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/50 p-8">
        <h2 className="text-2xl font-bold mb-2">Continue Learning</h2>
        <p className="text-muted-foreground mb-4">
          You're making great progress! Continue with the next chapter to build more skills.
        </p>
      </div>
    </div>
  )
}
