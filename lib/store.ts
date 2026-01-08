import { create } from "zustand"

export interface UserState {
  isLoggedIn: boolean
  username: string
  selectedLanguage: "javascript" | "java" | "python" | null
  isBeginner: boolean | null
  currentAssessmentScore: number | null
  completedChapters: string[]
  testScores: Record<number, number>
  currentLevel: number
  skills: {
    strengths: string[]
    weakAreas: string[]
  }
  viewHomepage: boolean
}

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  selectedLanguage: null,
  isBeginner: null,
  currentAssessmentScore: null,
  completedChapters: [],
  testScores: {},
  currentLevel: 1,
  skills: {
    strengths: [],
    weakAreas: [],
  },
  viewHomepage: true,
}

export const useUserStore = create<
  UserState & {
    login: (username: string) => void
    logout: () => void
    setBeginner: (isBeginner: boolean) => void
    setLanguage: (language: "javascript" | "java" | "python") => void
    setAssessmentScore: (score: number, strengths: string[], weakAreas: string[]) => void
    setLevel: (level: number) => void
    setTestScore: (levelIndex: number, score: number) => void
    completeChapter: (chapterName: string) => void
    resetOnboarding: () => void
    setViewHomepage: (view: boolean) => void
  }
>((set) => ({
  ...initialState,
  login: (username: string) => set({ isLoggedIn: true, username, viewHomepage: false }),
  logout: () => set({ ...initialState, viewHomepage: true }),
  setBeginner: (isBeginner: boolean) => set({ isBeginner }),
  setLanguage: (language: "javascript" | "java" | "python") => set({ selectedLanguage: language }),
  setAssessmentScore: (score: number, strengths: string[], weakAreas: string[]) =>
    set({
      currentAssessmentScore: score,
      skills: { strengths, weakAreas },
      currentLevel: score >= 70 ? 2 : 1,
    }),
  setLevel: (level: number) => set({ currentLevel: level }),
  setTestScore: (levelIndex: number, score: number) =>
    set((state) => ({
      testScores: { ...state.testScores, [levelIndex]: score },
    })),
  completeChapter: (chapterName: string) =>
    set((state) => ({
      completedChapters: [...state.completedChapters, chapterName],
    })),
  resetOnboarding: () =>
    set((state) => ({
      selectedLanguage: null,
      isBeginner: null,
      currentAssessmentScore: null,
    })),
  setViewHomepage: (view: boolean) => set({ viewHomepage: view }),
}))
