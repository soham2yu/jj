export interface Participant {
  id: string
  username: string
  score: number
  level: number
  completedAt: number
}

export interface Competition {
  id: number
  name: string
  startDate: string
  endDate: string
  status: "upcoming" | "active" | "completed"
  timeRemaining?: string
  difficulty: "Easy" | "Medium" | "Hard"
  questions: number
  maxScore: number
  participants: Participant[]
  description: string
}

// Mock leaderboard data
const mockParticipants: Participant[] = [
  {
    id: "1",
    username: "alex_dev",
    score: 95,
    level: 5,
    completedAt: 1200,
  },
  {
    id: "2",
    username: "sarah_codes",
    score: 92,
    level: 4,
    completedAt: 1350,
  },
  {
    id: "3",
    username: "mike_js",
    score: 88,
    level: 4,
    completedAt: 1500,
  },
  {
    id: "4",
    username: "emily_web",
    score: 85,
    level: 3,
    completedAt: 1680,
  },
  {
    id: "5",
    username: "jordan_tech",
    score: 82,
    level: 3,
    completedAt: 1800,
  },
]

export const MOCK_COMPETITIONS: Competition[] = [
  {
    id: 1,
    name: "JavaScript Fundamentals Challenge",
    startDate: "2026-01-12",
    endDate: "2026-01-19",
    status: "active",
    timeRemaining: "5 days 12h",
    difficulty: "Easy",
    questions: 15,
    maxScore: 100,
    description: "Test your knowledge of JavaScript basics, variables, and operators.",
    participants: mockParticipants.slice(0, 5),
  },
  {
    id: 2,
    name: "Advanced Async Operations",
    startDate: "2026-01-26",
    endDate: "2026-02-02",
    status: "upcoming",
    timeRemaining: "12 days 8h",
    difficulty: "Hard",
    questions: 20,
    maxScore: 100,
    description: "Master promises, async/await, and complex async patterns.",
    participants: [],
  },
  {
    id: 3,
    name: "DOM Manipulation Marathon",
    startDate: "2026-01-19",
    endDate: "2026-01-26",
    status: "upcoming",
    timeRemaining: "7 days",
    difficulty: "Medium",
    questions: 18,
    maxScore: 100,
    description: "Work with the DOM, events, and dynamic HTML modifications.",
    participants: [],
  },
]
