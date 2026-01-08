"use client"
import { Login } from "@/components/auth/login"
import { Onboarding } from "@/components/auth/onboarding"
import { Dashboard } from "@/components/dashboard/dashboard"
import { HomePage } from "@/components/home/home-page"
import { useUserStore } from "@/lib/store"

export default function Home() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn)
  const selectedLanguage = useUserStore((state) => state.selectedLanguage)
  const currentAssessmentScore = useUserStore((state) => state.currentAssessmentScore)
  const viewHomepage = useUserStore((state) => state.viewHomepage)

  if (viewHomepage) {
    return <HomePage />
  }

  if (!isLoggedIn) {
    return <Login />
  }

  if (!selectedLanguage || currentAssessmentScore === null) {
    return <Onboarding />
  }

  return <Dashboard />
}
