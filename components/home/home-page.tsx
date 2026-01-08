"use client"

import { Button } from "@/components/ui/button"
import { useUserStore } from "@/lib/store"
import { Brain, Zap, BarChart3, Trophy, ArrowRight, Sparkles } from "lucide-react"

export function HomePage() {
  const setViewHomepage = useUserStore((state) => state.setViewHomepage)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-vibrant opacity-10 blur-3xl -z-10" />
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect-strong border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 float">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary-accent bg-clip-text text-transparent">
              SkillGraph AI
            </span>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setViewHomepage(false)}
              className="border-border/50 hover:bg-primary/10 transition-smooth"
            >
              Sign In
            </Button>
            <Button
              onClick={() => setViewHomepage(false)}
              className="bg-gradient-primary-accent hover:shadow-lg hover:shadow-primary/50 transition-smooth"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect-strong mx-auto">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">🚀 AI-Powered Learning Platform</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-vibrant bg-clip-text text-transparent">Master Full Stack</span>
                <br />
                <span className="text-foreground">Development with AI</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Learn JavaScript, React, Node.js, and more with personalized AI guidance, interactive assessments, and
                real-time progress tracking. From beginner to tech lead.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => setViewHomepage(false)}
                className="bg-gradient-primary-accent hover:shadow-lg hover:shadow-primary/50 text-primary-foreground transition-smooth group"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 transition-smooth bg-transparent"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12">
              {[
                { value: "10K+", label: "Active Learners" },
                { value: "50+", label: "Expert Courses" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2 hover-lift">
                  <div className="text-3xl font-bold bg-gradient-primary-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-accent-secondary bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground">Comprehensive tools designed for modern developers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Structured Learning",
                description: "10 comprehensive JavaScript chapters with AI-personalized pacing",
                gradient: "from-primary/20 to-primary/5",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Smart Testing",
                description: "5 difficulty levels with adaptive questions that match your skills",
                gradient: "from-accent/20 to-accent/5",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Competitions",
                description: "Compete with developers worldwide and win badges and rewards",
                gradient: "from-secondary/20 to-secondary/5",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Career Guidance",
                description: "Clear roadmap from junior developer to tech lead with salary insights",
                gradient: "from-primary/20 to-accent/20",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${feature.gradient} border border-border/50 rounded-2xl p-8 hover-lift hover:border-primary/50 hover:glow-primary transition-smooth`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-card/50 flex items-center justify-center text-primary group-hover:text-accent transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, title: "Beginner", desc: "Learn Fundamentals" },
              { step: 2, title: "Intermediate", desc: "Build Projects" },
              { step: 3, title: "Advanced", desc: "Master Concepts" },
              { step: 4, title: "Expert", desc: "Lead Teams" },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="glass-effect-strong rounded-xl p-6 text-center hover-lift h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary-accent flex items-center justify-center text-primary-foreground font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-primary-accent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-effect-strong border border-primary/20 rounded-3xl p-12 text-center space-y-6 glow-primary">
            <h2 className="text-4xl font-bold">Ready to Transform Your Career?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of developers already learning with SkillGraph AI
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => setViewHomepage(false)}
                className="bg-gradient-primary-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-smooth"
              >
                Start Free Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2026 SkillGraph AI. Empowering the next generation of developers.</p>
        </div>
      </footer>
    </div>
  )
}

import { BookOpen } from "lucide-react"
