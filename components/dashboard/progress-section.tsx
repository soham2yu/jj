"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Trophy, TrendingUp, Target } from "lucide-react"

export function ProgressSection() {
  const completedChapters = useUserStore((state) => state.completedChapters)
  const testScores = useUserStore((state) => state.testScores)
  const currentAssessmentScore = useUserStore((state) => state.currentAssessmentScore)
  const currentLevel = useUserStore((state) => state.currentLevel)
  const skills = useUserStore((state) => state.skills)

  // Calculate progress metrics
  const totalChapters = 10
  const chapterProgress = (completedChapters.length / totalChapters) * 100

  // Prepare chart data for performance over tests
  const performanceData = useMemo(() => {
    const data = [
      {
        name: "Initial Assessment",
        score: currentAssessmentScore || 0,
      },
    ]

    for (let i = 1; i <= 5; i++) {
      if (testScores[i] !== undefined) {
        data.push({
          name: `Level ${i}`,
          score: testScores[i],
        })
      }
    }

    return data.length > 1 ? data : [{ name: "Initial Assessment", score: currentAssessmentScore || 0 }]
  }, [testScores, currentAssessmentScore])

  // Chapter progress data
  const chapterData = useMemo(() => {
    return [
      {
        name: "JavaScript Basics",
        completed: completedChapters.includes("JavaScript Basics & Syntax") ? 1 : 0,
      },
      {
        name: "Data Types",
        completed: completedChapters.includes("Variables, Data Types & Operators") ? 1 : 0,
      },
      {
        name: "Functions",
        completed: completedChapters.includes("Functions & Scope") ? 1 : 0,
      },
      {
        name: "Arrays & Objects",
        completed: completedChapters.includes("Arrays & Objects") ? 1 : 0,
      },
      {
        name: "DOM",
        completed: completedChapters.includes("DOM Manipulation") ? 1 : 0,
      },
      {
        name: "ES6+",
        completed: completedChapters.includes("ES6+ Features") ? 1 : 0,
      },
      {
        name: "Async JS",
        completed: completedChapters.includes("Asynchronous JavaScript (Promises, async/await)") ? 1 : 0,
      },
      {
        name: "APIs",
        completed: completedChapters.includes("Browser APIs & Events") ? 1 : 0,
      },
      {
        name: "Node.js",
        completed: completedChapters.includes("JavaScript for Backend (Node.js Basics)") ? 1 : 0,
      },
      {
        name: "Full Stack",
        completed: completedChapters.includes("JavaScript in Full Stack Apps (Frontend + Backend Flow)") ? 1 : 0,
      },
    ]
  }, [completedChapters])

  // Determine skill level
  const getSkillLevel = (): "Beginner" | "Intermediate" | "Advanced" => {
    if (currentLevel >= 4) return "Advanced"
    if (currentLevel >= 3) return "Intermediate"
    return "Beginner"
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Chapters Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{completedChapters.length}/10</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round(chapterProgress)}% complete</p>
            <div className="w-full bg-input rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${chapterProgress}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Current Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{currentLevel}/5</div>
            <p className="text-xs text-muted-foreground mt-1">{getSkillLevel()} Developer</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Average Test Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {Object.keys(testScores).length > 0
                ? Math.round(Object.values(testScores).reduce((a, b) => a + b, 0) / Object.keys(testScores).length)
                : Math.round(currentAssessmentScore || 0)}
              %
            </div>
            <p className="text-xs text-muted-foreground mt-1">{Object.keys(testScores).length} tests taken</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skill Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{Math.round(currentAssessmentScore || 0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Initial placement score</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Test scores across all levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Legend wrapperStyle={{ color: "var(--foreground)" }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)" }}
                  name="Score %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chapter Completion */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Chapter Completion</CardTitle>
            <CardDescription>Progress on each chapter</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chapterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  style={{ fontSize: "12px" }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="completed" fill="var(--primary)" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
            <CardDescription>Topics where you excel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.strengths.length > 0 ? (
                skills.strengths.map((strength, idx) => (
                  <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {strength}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground">Complete assessments to see strengths</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Areas to Improve</CardTitle>
            <CardDescription>Topics to focus on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.weakAreas.length > 0 ? (
                skills.weakAreas.map((area, idx) => (
                  <span key={idx} className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                    {area}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground">Complete assessments to see areas for improvement</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentLevel < 5 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">📈</span>
              <div>
                <p className="font-medium text-foreground">Keep Progressing</p>
                <p className="text-sm text-muted-foreground">
                  You're doing great! Continue to level {currentLevel + 1} to unlock new concepts.
                </p>
              </div>
            </div>
          )}

          {skills.weakAreas.length > 0 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🎯</span>
              <div>
                <p className="font-medium text-foreground">Focus Areas</p>
                <p className="text-sm text-muted-foreground">
                  Review chapters on {skills.weakAreas.join(", ")} to strengthen your skills.
                </p>
              </div>
            </div>
          )}

          {chapterProgress < 100 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">📚</span>
              <div>
                <p className="font-medium text-foreground">Complete All Chapters</p>
                <p className="text-sm text-muted-foreground">
                  {10 - completedChapters.length} chapters remaining. Completing all chapters gives you the full
                  picture.
                </p>
              </div>
            </div>
          )}

          {currentLevel >= 5 && chapterProgress === 100 && (
            <div className="flex items-start gap-3">
              <span className="text-lg">🏆</span>
              <div>
                <p className="font-medium text-foreground">Congratulations!</p>
                <p className="text-sm text-muted-foreground">
                  You've mastered all levels! Compete with others to further test your skills.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
