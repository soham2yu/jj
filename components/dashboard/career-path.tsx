"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/lib/store"
import { Briefcase, TrendingUp, Award, Users, Zap, Globe } from "lucide-react"

export function CareerPath() {
  const currentLevel = useUserStore((state) => state.currentLevel)
  const skills = useUserStore((state) => state.skills)

  const careerStages = [
    {
      title: "Junior Developer",
      levelRequired: 2,
      skills: ["HTML, CSS, JavaScript", "Basic DOM manipulation", "Git & Version Control", "Responsive Design"],
      salary: "$60K - $80K",
      companies: ["Startups", "Small Agencies", "Freelance Projects"],
    },
    {
      title: "Mid-Level Developer",
      levelRequired: 3,
      skills: ["Modern frameworks (React, Vue)", "Backend basics (Node.js)", "Databases", "API design", "Testing"],
      salary: "$80K - $120K",
      companies: ["Mid-size Tech Companies", "Product Companies", "Agencies"],
    },
    {
      title: "Senior Developer",
      levelRequired: 4,
      skills: [
        "System design",
        "Architecture patterns",
        "Team leadership",
        "Mentoring",
        "DevOps basics",
        "Performance optimization",
      ],
      salary: "$120K - $180K",
      companies: ["FAANG companies", "High-growth startups", "Enterprise"],
    },
    {
      title: "Tech Lead / Architect",
      levelRequired: 5,
      skills: [
        "Full system design",
        "Tech strategy",
        "Team management",
        "Business acumen",
        "Advanced architecture",
        "Infrastructure",
      ],
      salary: "$150K - $250K+",
      companies: ["Leading tech companies", "Fortune 500", "Startup founders"],
    },
  ]

  const webDeveloperBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "High Demand",
      description: "Web developers are among the most sought-after professionals globally.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Remote Opportunities",
      description: "Work from anywhere in the world with flexible schedules.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Growth",
      description: "Skills are in constant demand with rapid career progression.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Competitive Salary",
      description: "Web development offers competitive compensation packages.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Work",
      description: "Work with creative teams on impactful projects.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Diverse Roles",
      description: "Choose frontend, backend, full-stack, or specialized areas.",
    },
  ]

  const requiredSkills = [
    { name: "HTML & CSS", level: 1, description: "Fundamental for web development" },
    { name: "JavaScript", level: 2, description: "Core programming language for web" },
    { name: "React / Vue / Angular", level: 3, description: "Modern frontend frameworks" },
    { name: "Node.js & Express", level: 3, description: "Backend development with JavaScript" },
    { name: "Databases (SQL/NoSQL)", level: 3, description: "Data persistence and management" },
    { name: "Git & GitHub", level: 2, description: "Version control and collaboration" },
    { name: "APIs & REST", level: 4, description: "Backend communication patterns" },
    { name: "DevOps & Deployment", level: 5, description: "Production deployment and monitoring" },
  ]

  const nextMilestones = [
    { level: 2, milestone: "Build 3 complete projects", description: "Portfolio building projects" },
    { level: 3, milestone: "Master one framework deeply", description: "Specialize in React or similar" },
    { level: 4, milestone: "Contribute to open source", description: "Real-world project experience" },
    { level: 5, milestone: "Lead a team or project", description: "Leadership and mentoring" },
  ]

  return (
    <div className="space-y-8">
      {/* Career Path Overview */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Career Path: Full Stack Web Developer</h2>
        <p className="text-muted-foreground mb-6">
          Based on your progress (Level {currentLevel}), here's how you can advance your career.
        </p>

        <div className="grid gap-4">
          {careerStages.map((stage) => {
            const isUnlocked = currentLevel >= stage.levelRequired
            return (
              <Card key={stage.title} className={`border-border/50 ${!isUnlocked ? "opacity-50" : ""}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {stage.title}
                      </CardTitle>
                      <CardDescription>Requires Level {stage.levelRequired}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{stage.salary}</p>
                      <p className="text-xs text-muted-foreground">Typical Range</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-sm mb-2">Key Skills Required:</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-card/50 border border-border/50 px-3 py-1 rounded-full text-sm text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-2">Typical Employers:</p>
                    <p className="text-sm text-muted-foreground">{stage.companies.join(", ")}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Why Web Development */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Why Become a Web Developer?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {webDeveloperBenefits.map((benefit, idx) => (
            <Card key={idx} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-primary">{benefit.icon}</div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Required Skills */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Essential Skills to Master</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {requiredSkills.map((skill, idx) => {
            const isLearned = currentLevel >= skill.level
            return (
              <Card key={idx} className={`border-border/50 ${!isLearned ? "opacity-60" : ""}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{skill.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{skill.description}</CardDescription>
                    </div>
                    {isLearned && <span className="text-lg">✓</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-input rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(Math.min(currentLevel, skill.level) / skill.level) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Target: Level {skill.level} {currentLevel >= skill.level && "- Completed"}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Next Milestones */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Next Milestones</h2>
        <div className="space-y-3">
          {nextMilestones.map((item, idx) => {
            const isActive = currentLevel >= item.level
            const isPassed = currentLevel > item.level
            return (
              <Card key={idx} className={`border-border/50 ${!isActive ? "opacity-50" : ""}`}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isPassed
                        ? "bg-primary text-primary-foreground"
                        : "bg-input text-muted-foreground border border-border"
                    }`}
                  >
                    {isPassed ? "✓" : item.level}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.milestone}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Current Progress Summary */}
      <Card className="border-primary/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle>Your Current Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Level</p>
              <p className="text-2xl font-bold text-primary">{currentLevel}/5</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Career Stage</p>
              <p className="text-2xl font-bold text-accent">
                {currentLevel <= 2
                  ? "Junior"
                  : currentLevel <= 3
                    ? "Mid-Level"
                    : currentLevel <= 4
                      ? "Senior"
                      : "Tech Lead"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Continue learning to unlock higher career opportunities!
            </p>
            <p className="text-sm text-foreground">
              {currentLevel < 5
                ? `You're ${5 - currentLevel} levels away from reaching Tech Lead level with potential earnings of $150K-$250K+`
                : "You've reached the highest level! Ready to lead and mentor others."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
