"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const JAVASCRIPT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["var x = 5;", "variable x = 5;", "declare x = 5;", "x := 5"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "What does JSON stand for?",
    options: [
      "JavaScript Object Notation",
      "JavaScript Output Notation",
      "Java Source Object Notation",
      "JavaScript Online Network",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "Which method is used to find an element in an array?",
    options: ["search()", "find()", "locate()", "query()"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "What is the purpose of async/await?",
    options: [
      "To make code run faster",
      "To handle asynchronous operations more cleanly",
      "To store data temporarily",
      "To optimize memory usage",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which of these is NOT a JavaScript data type?",
    options: ["String", "Number", "Boolean", "Character"],
    correctAnswer: 3,
  },
  {
    id: 6,
    question: 'What does "this" refer to in JavaScript?',
    options: ["The current function", "The current object context", "The previous variable", "A reserved keyword"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "How do you create a function in JavaScript?",
    options: ["function myFunc() {}", "def myFunc(): {}", "func myFunc() {}", "create myFunc {}"],
    correctAnswer: 0,
  },
  {
    id: 8,
    question: "What is the DOM?",
    options: [
      "Document Object Model",
      "Data Organization Method",
      "Dynamic Object Management",
      "Database Operational Model",
    ],
    correctAnswer: 0,
  },
  {
    id: 9,
    question: "Which method adds an element to the end of an array?",
    options: ["add()", "append()", "push()", "insert()"],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "What is a Promise in JavaScript?",
    options: [
      "A function that runs immediately",
      "An object representing eventual completion of an async operation",
      "A variable that stores data",
      "A loop statement",
    ],
    correctAnswer: 1,
  },
]

export function InitialAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const setAssessmentScore = useUserStore((state) => state.setAssessmentScore)
  const strengths = useUserStore((state) => state.skills.strengths)
  const weakAreas = useUserStore((state) => state.skills.weakAreas)

  const questions = JAVASCRIPT_QUESTIONS

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++
      }
    })

    const percentage = (correctCount / questions.length) * 100
    setScore(percentage)

    // Determine strengths and weak areas based on answers
    const newStrengths: string[] = []
    const newWeakAreas: string[] = []

    if (selectedAnswers[0] === 0) newStrengths.push("Variable Declaration")
    else newWeakAreas.push("Variable Declaration")

    if (selectedAnswers[3] === 1 && selectedAnswers[6] === 0) newStrengths.push("Async Programming")
    else newWeakAreas.push("Async Programming")

    if (selectedAnswers[7] === 0 && selectedAnswers[8] === 2) newStrengths.push("DOM & Array Methods")
    else newWeakAreas.push("DOM & Array Methods")

    setAssessmentScore(
      percentage,
      newStrengths.length > 0 ? newStrengths : ["Fundamentals"],
      newWeakAreas.length > 0 ? newWeakAreas : ["Advanced Topics"],
    )
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (showResults) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-lg border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Assessment Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{Math.round(score)}%</div>
              <p className="text-muted-foreground">
                {score >= 70
                  ? "Great job! Ready for next level."
                  : "Keep practicing! We have a perfect learning path for you."}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-accent mb-2">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {strengths.map((strength, idx) => (
                    <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-secondary mb-2">Areas to Improve</h3>
                <div className="flex flex-wrap gap-2">
                  {weakAreas.map((area, idx) => (
                    <span key={idx} className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Learning</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-2xl border-border/50 bg-card/80 backdrop-blur">
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
              className="flex-1 border-border/50 hover:bg-primary/10 bg-transparent"
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
