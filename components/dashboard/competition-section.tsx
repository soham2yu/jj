"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/store"
import { MOCK_COMPETITIONS, type Competition } from "@/lib/competitions"
import { Trophy, Clock, Users, Zap } from "lucide-react"

type CompetitionView = "list" | "detail" | "leaderboard" | "participate"

export function CompetitionSection() {
  const [view, setView] = useState<CompetitionView>("list")
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)
  const [participationScore, setParticipationScore] = useState<number | null>(null)
  const username = useUserStore((state) => state.username)
  const currentLevel = useUserStore((state) => state.currentLevel)

  const handleSelectCompetition = (comp: Competition) => {
    setSelectedCompetition(comp)
    setView("detail")
  }

  const handleParticipate = () => {
    setView("participate")
  }

  const handleSubmitScore = (score: number) => {
    setParticipationScore(score)
    setView("leaderboard")
  }

  if (view === "list") {
    return <CompetitionListView competitions={MOCK_COMPETITIONS} onSelect={handleSelectCompetition} />
  }

  if (view === "detail" && selectedCompetition) {
    return (
      <CompetitionDetailView
        competition={selectedCompetition}
        onParticipate={handleParticipate}
        onBack={() => setView("list")}
      />
    )
  }

  if (view === "participate" && selectedCompetition) {
    return (
      <CompetitionParticipateView
        competition={selectedCompetition}
        username={username}
        onSubmit={handleSubmitScore}
        onBack={() => setView("detail")}
      />
    )
  }

  if (view === "leaderboard" && selectedCompetition) {
    return (
      <CompetitionLeaderboardView
        competition={selectedCompetition}
        userScore={participationScore || 0}
        username={username}
        onBack={() => setView("list")}
      />
    )
  }

  return null
}

function CompetitionListView({
  competitions,
  onSelect,
}: {
  competitions: Competition[]
  onSelect: (comp: Competition) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary/20 text-primary"
      case "upcoming":
        return "bg-secondary/20 text-secondary"
      case "completed":
        return "bg-muted/20 text-muted-foreground"
      default:
        return "bg-card"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Weekly Competitions</h2>
        <p className="text-muted-foreground">Compete with other developers and test your skills</p>
      </div>

      <div className="grid gap-4">
        {competitions.map((comp) => (
          <Card key={comp.id} className="border-border/50 hover:border-primary/50 cursor-pointer transition">
            <CardHeader>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <CardTitle className="text-xl">{comp.name}</CardTitle>
                  <CardDescription>{comp.description}</CardDescription>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(comp.status)}`}>
                  {comp.status === "active" ? "Active Now" : comp.status === "upcoming" ? "Coming Soon" : "Completed"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                  <p className="font-semibold text-sm">{comp.difficulty}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Questions</p>
                  <p className="font-semibold text-sm">{comp.questions}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Time Left
                  </p>
                  <p className="font-semibold text-sm">{comp.timeRemaining}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Participants
                  </p>
                  <p className="font-semibold text-sm">{comp.participants.length}</p>
                </div>
              </div>

              <Button onClick={() => onSelect(comp)} className="w-full bg-primary hover:bg-primary/90">
                {comp.status === "active" ? "Join Competition" : "View Details"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CompetitionDetailView({
  competition,
  onParticipate,
  onBack,
}: {
  competition: Competition
  onParticipate: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onBack} className="border-border/50 bg-transparent">
        Back to Competitions
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-3xl">{competition.name}</CardTitle>
                  <CardDescription className="mt-2">{competition.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Competition Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Difficulty Level</p>
                    <p className="text-lg font-bold text-primary">{competition.difficulty}</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Questions</p>
                    <p className="text-lg font-bold text-accent">{competition.questions}</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="text-lg font-bold text-secondary">1 hour</p>
                  </div>
                  <div className="bg-card/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className="text-lg font-bold text-foreground">
                      {competition.status === "active" ? "Active" : "Upcoming"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {[
                    "Test your JavaScript knowledge under pressure",
                    "Compare your skills with other developers",
                    "Get ranked on the global leaderboard",
                    "Earn badges and recognition",
                    "Identify weak areas through competition",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Zap className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-primary/50 bg-gradient-to-b from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle>Ready to Compete?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Prizes</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">1st Place Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Top 10 Recognition</span>
                  </div>
                </div>
              </div>
              <Button onClick={onParticipate} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Competition
              </Button>
            </CardContent>
          </Card>

          {competition.participants.length > 0 && (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Top Participants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {competition.participants.slice(0, 3).map((p, idx) => (
                  <div key={p.id} className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground font-bold">{idx + 1}.</span>
                      {p.username}
                    </span>
                    <span className="font-semibold text-primary">{p.score}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function CompetitionParticipateView({
  competition,
  username,
  onSubmit,
  onBack,
}: {
  competition: Competition
  username: string
  onSubmit: (score: number) => void
  onBack: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(3600) // 1 hour in seconds

  // Mock competition questions
  const questions = Array.from({ length: competition.questions }, (_, i) => ({
    id: i + 1,
    question: `Competition Question ${i + 1}: What concept would you like to test?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
  }))

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleSubmit = () => {
    // Calculate score based on correct answers
    const score = Math.floor((Object.keys(selectedAnswers).length / questions.length) * 100)
    onSubmit(score)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const question = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack} className="border-border/50 bg-transparent">
          Exit Competition
        </Button>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Time Remaining</p>
          <p className={`text-2xl font-bold ${timeRemaining < 300 ? "text-destructive" : "text-primary"}`}>
            {formatTime(timeRemaining)}
          </p>
        </div>
      </div>

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
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`w-full p-3 rounded-lg border transition text-left ${
                  selectedAnswers[currentQuestion] === idx
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/50 hover:bg-card/50"
                }`}
              >
                <p className="font-medium text-sm">{option}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1 border-border/50 bg-transparent"
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                Submit Competition
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

function CompetitionLeaderboardView({
  competition,
  userScore,
  username,
  onBack,
}: {
  competition: Competition
  userScore: number
  username: string
  onBack: () => void
}) {
  // Add user to leaderboard
  const leaderboard = [
    ...competition.participants,
    { id: "current_user", username, score: userScore, level: 0, completedAt: 0 },
  ].sort((a, b) => b.score - a.score)

  const userRank = leaderboard.findIndex((p) => p.username === username) + 1

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button variant="outline" onClick={onBack} className="border-border/50 bg-transparent">
        Back to Competitions
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Competition Leaderboard</CardTitle>
              <CardDescription>{competition.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.slice(0, 10).map((participant, idx) => {
                  const isCurrentUser = participant.username === username
                  return (
                    <div
                      key={participant.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition ${
                        isCurrentUser
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/50 hover:border-primary/50 hover:bg-card/50"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-2xl font-bold text-muted-foreground w-8">{idx + 1}</span>
                        <div>
                          <p className="font-semibold text-foreground">{participant.username}</p>
                          <p className="text-xs text-muted-foreground">Level {participant.level || 3}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{participant.score}%</p>
                        {idx === 0 && <Trophy className="w-5 h-5 text-yellow-500 mx-auto mt-1" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-primary/50 bg-gradient-to-b from-primary/10 to-accent/10">
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                <p className="text-4xl font-bold text-primary">{userScore}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
                <p className="text-3xl font-bold text-accent">#{userRank}</p>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Performance</p>
                <p className="text-sm text-foreground">
                  {userScore >= 80
                    ? "Excellent performance! Keep competing."
                    : userScore >= 60
                      ? "Good effort! Practice more to improve."
                      : "Keep practicing to master the concepts."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Button onClick={onBack} className="w-full bg-primary hover:bg-primary/90">
            Back to Competitions
          </Button>
        </div>
      </div>
    </div>
  )
}
