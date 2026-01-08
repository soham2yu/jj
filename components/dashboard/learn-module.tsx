"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JAVASCRIPT_CHAPTERS } from "@/lib/learning-modules"
import { useUserStore } from "@/lib/store"
import { Clock, Check } from "lucide-react"

export function LearnModule() {
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null)
  const completedChapters = useUserStore((state) => state.completedChapters)
  const completeChapter = useUserStore((state) => state.completeChapter)

  const selectedChapter = selectedChapterId ? JAVASCRIPT_CHAPTERS.find((c) => c.id === selectedChapterId) : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {selectedChapter ? (
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl">{selectedChapter.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4" />
                    {selectedChapter.estimatedTime} minutes
                  </CardDescription>
                </div>
                {completedChapters.includes(selectedChapter.title) && <Check className="w-6 h-6 text-primary" />}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground whitespace-pre-line text-sm leading-relaxed">{selectedChapter.content}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {selectedChapter.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => completeChapter(selectedChapter.title)}
                disabled={completedChapters.includes(selectedChapter.title)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {completedChapters.includes(selectedChapter.title) ? "Chapter Completed" : "Mark as Completed"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50">
            <CardContent className="flex items-center justify-center h-96">
              <p className="text-muted-foreground text-center">Select a chapter from the right panel to get started</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-border/50 rounded-lg p-4 sticky top-24">
          <h3 className="font-semibold mb-4">JavaScript Curriculum</h3>
          <div className="space-y-2 max-h-96 overflow-auto">
            {JAVASCRIPT_CHAPTERS.map((chapter) => {
              const isCompleted = completedChapters.includes(chapter.title)
              return (
                <button
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedChapterId === chapter.id
                      ? "bg-primary/20 border border-primary"
                      : "hover:bg-card/50 border border-border/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">{chapter.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chapter.estimatedTime} min</p>
                    </div>
                    {isCompleted && <Check className="w-4 h-4 text-primary mt-1" />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
