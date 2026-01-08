"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import { InitialAssessment } from "./initial-assessment"
import { ChevronRight, Brain } from "lucide-react"

type OnboardingStep = "beginner-level" | "language-selection" | "assessment"

export function Onboarding() {
  const [step, setStep] = useState<OnboardingStep>("beginner-level")
  const setBeginner = useUserStore((state) => state.setBeginner)
  const setLanguage = useUserStore((state) => state.setLanguage)

  const handleBeginnerSelection = (value: boolean) => {
    setBeginner(value)
    setStep("language-selection")
  }

  const handleLanguageSelection = (lang: "javascript" | "java" | "python") => {
    setLanguage(lang)
    setStep("assessment")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/10 to-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Logo Header */}
      <div className="pt-8 px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-8">
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary-accent bg-clip-text text-transparent">
            SkillGraph AI
          </span>
        </div>
      </div>

      {step === "beginner-level" && <BeginnerLevelStep onSelect={handleBeginnerSelection} />}
      {step === "language-selection" && <LanguageSelectionStep onSelect={handleLanguageSelection} />}
      {step === "assessment" && <InitialAssessment />}
    </div>
  )
}

function BeginnerLevelStep({ onSelect }: { onSelect: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
      <Card className="w-full max-w-lg glass-effect-strong border-primary/20 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl bg-gradient-primary-accent bg-clip-text text-transparent">
            Let's Get Started
          </CardTitle>
          <CardDescription className="text-base">Tell us about your experience level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => onSelect(true)}
            variant="outline"
            className="w-full h-24 text-lg border-primary/30 hover:bg-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/30 transition-smooth group"
          >
            <span className="flex flex-col items-center gap-2">
              <span className="text-3xl group-hover:scale-125 transition-transform">👶</span>
              I'm a Beginner
            </span>
          </Button>

          <Button
            onClick={() => onSelect(false)}
            variant="outline"
            className="w-full h-24 text-lg border-accent/30 hover:bg-accent/20 hover:border-accent hover:shadow-lg hover:shadow-accent/30 transition-smooth group"
          >
            <span className="flex flex-col items-center gap-2">
              <span className="text-3xl group-hover:scale-125 transition-transform">🚀</span>I Have Some Experience
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function LanguageSelectionStep({
  onSelect,
}: {
  onSelect: (lang: "javascript" | "java" | "python") => void
}) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
      <Card className="w-full max-w-lg glass-effect-strong border-primary/20 bg-gradient-to-br from-card to-card/50">
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl bg-gradient-accent-secondary bg-clip-text text-transparent">
            Choose Your Language
          </CardTitle>
          <CardDescription className="text-base">Select the language you want to master</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { lang: "javascript" as const, label: "JavaScript", emoji: "⚡", color: "primary" },
            { lang: "java" as const, label: "Java", emoji: "☕", color: "accent" },
            { lang: "python" as const, label: "Python", emoji: "🐍", color: "secondary" },
          ].map((option) => (
            <Button
              key={option.lang}
              onClick={() => onSelect(option.lang)}
              variant="outline"
              className={`w-full h-20 text-lg border-${option.color}/30 hover:bg-${option.color}/20 hover:border-${option.color} hover:shadow-lg transition-smooth justify-center gap-3 group`}
            >
              <span className="text-3xl group-hover:scale-125 transition-transform">{option.emoji}</span>
              <span>{option.label}</span>
              <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
