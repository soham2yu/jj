"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useUserStore } from "@/lib/store"
import {
  LEVEL_1_QUESTIONS,
  LEVEL_2_QUESTIONS,
  LEVEL_3_QUESTIONS,
  LEVEL_4_QUESTIONS,
  LEVEL_5_QUESTIONS,
} from "@/lib/learning-modules"
import { Lock } from "lucide-react"

const LEVEL_CONFIGS = [
  { level: 1, name: "Basics", icon: "📚", description: "Master fundamental concepts" },
  { level: 2, name: "Core Logic", icon: "🔧", description: "Understand core JavaScript logic" },
  { level: 3, name: "DOM & ES6", icon: "⚙️", description: "DOM manipulation and modern JavaScript" },
  { level: 4, name: "Async & APIs", icon: "🌐", description: "Asynchronous programming and APIs" },
  { level: 5, name: "Full Stack", icon: "🚀", description: "Full stack development concepts" },
]

export function TestSection() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const currentLevel = useUserStore((state) => state.currentLevel)
  const setLevel = useUserStore((state) => state.setLevel)
  const setTestScore = useUserStore((state) => state.setTestScore)
  const testScores = useUserStore((state) => state.testScores)

  const getQuestionsForLevel = (level: number) => {
    const levelMap: Record<number, typeof LEVEL_1_QUESTIONS> = {
      1: LEVEL_1_QUESTIONS,
      2: LEVEL_2_QUESTIONS,
      3: LEVEL_3_QUESTIONS,
      4: LEVEL_4_QUESTIONS,
      5: LEVEL_5_QUESTIONS,
    }
    return levelMap[level] || []
  }

  const isLevelUnlocked = (level: number) => currentLevel >= level

  const handleStartTest = (level: number) => {
    if (!isLevelUnlocked(level)) return
    setSelectedLevel(level)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    if (!selectedLevel) return
    const questions = getQuestionsForLevel(selectedLevel)
    let correctCount = 0

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++
      }
    })

    const percentage = (correctCount / questions.length) * 100
    setScore(percentage)
    setTestScore(selectedLevel, percentage)

    if (percentage >= 70 && selectedLevel < 5) {
      setLevel(selectedLevel + 1)
    }

    setShowResults(true)
  }

  const handleNext = () => {
    if (!selectedLevel) return
    const questions = getQuestionsForLevel(selectedLevel)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleReturnToLevels = () => {
    setSelectedLevel(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
  }

  if (selectedLevel && !showResults) {
    const questions = getQuestionsForLevel(selectedLevel)
    const question = questions[currentQuestion]

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={handleReturnToLevels} className="mb-6 border-border/50 bg-transparent">
          Back to Levels
        </Button>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-32 bg-input rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={String(selectedAnswers[currentQuestion] ?? -1)}>
              {question.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 cursor-pointer transition"
                  onClick={() => handleAnswer(idx)}
                >
                  <RadioGroupItem value={String(idx)} id={`option-${idx}`} />
                  <label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handlePrev}
                variant="outline"
                disabled={currentQuestion === 0}
                className="flex-1 border-border/50 bg-transparent"
              >
                Previous
              </Button>
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedLevel && showResults) {
    const config = LEVEL_CONFIGS.find((c) => c.level === selectedLevel)
    const passedTest = score >= 70

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={handleReturnToLevels} className="mb-6 border-border/50 bg-transparent">
          Back to Levels
        </Button>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Test Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{Math.round(score)}%</div>
              <p className="text-lg font-semibold mb-2">
                {passedTest
                  ? `Great! You passed ${config?.name}!`
                  : `Keep practicing ${config?.name} - you'll master it!`}
              </p>
              <p className="text-muted-foreground">
                {passedTest
                  ? currentLevel < 5
                    ? "Ready for the next level!"
                    : "You've completed all levels!"
                  : "Review the material and try again"}
              </p>
            </div>

            <div className="bg-card/50 rounded-lg p-4 border border-border/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Questions Correct</p>
                  <p className="text-2xl font-bold text-primary">{Math.round((score / 100) * 10)}/10</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pass Threshold</p>
                  <p className="text-2xl font-bold text-secondary">70%</p>
                </div>
              </div>
            </div>

            <Button onClick={handleReturnToLevels} className="w-full bg-primary hover:bg-primary/90">
              Return to Levels
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Test Levels</h2>
        <p className="text-muted-foreground">Progress through difficulty levels by scoring 70% or higher</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEVEL_CONFIGS.map((config) => {
          const isUnlocked = isLevelUnlocked(config.level)
          const scoreForLevel = testScores[config.level]
          const hasPassed = scoreForLevel && scoreForLevel >= 70

          return (
            <Card
              key={config.level}
              className={`cursor-pointer transition ${
                isUnlocked ? "border-border/50 hover:border-primary/50" : "border-border/20 opacity-50"
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-3xl">{config.icon}</span>
                  {!isUnlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                  {hasPassed && <span className="text-lg">✓</span>}
                </div>
                <CardTitle>{config.name}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {scoreForLevel && (
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground">Your Score</p>
                    <p className={`text-2xl font-bold ${hasPassed ? "text-primary" : "text-secondary"}`}>
                      {Math.round(scoreForLevel)}%
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => handleStartTest(config.level)}
                  disabled={!isUnlocked}
                  className="w-full"
                  variant={scoreForLevel && scoreForLevel >= 70 ? "outline" : "default"}
                >
                  {scoreForLevel ? "Retake Test" : "Start Test"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
