"use client"

import { useState } from "react"
import { Download } from "lucide-react"

interface CourseResult {
  code: string
  name: string
  quiz: number
  assignment: number
  midterm: number
  final: number
  total: number
  percentage: number
  grade: string
}

export default function ResultsView() {
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101")

  const results: CourseResult[] = [
    {
      code: "CS101",
      name: "Database Systems",
      quiz: 18,
      assignment: 38,
      midterm: 42,
      final: 88,
      total: 186,
      percentage: 93,
      grade: "A",
    },
    {
      code: "CS201",
      name: "Web Development",
      quiz: 17,
      assignment: 36,
      midterm: 40,
      final: 82,
      total: 175,
      percentage: 87.5,
      grade: "B+",
    },
    {
      code: "CS301",
      name: "Data Structures",
      quiz: 19,
      assignment: 39,
      midterm: 44,
      final: 86,
      total: 188,
      percentage: 94,
      grade: "A",
    },
  ]

  const selected = results.find((r) => r.code === selectedCourse)

  const getGradeColor = (grade: string) => {
    if (grade === "A") return "bg-accent/20 text-accent"
    if (grade.startsWith("B")) return "bg-primary/20 text-primary"
    if (grade.startsWith("C")) return "bg-chart-3/20 text-chart-3"
    return "bg-destructive/20 text-destructive"
  }

  return (
    <div className="space-y-6">
      {/* Course Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Your Results</h3>
        <div className="space-y-3">
          {results.map((result) => (
            <button
              key={result.code}
              onClick={() => setSelectedCourse(result.code)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedCourse === result.code
                  ? "bg-primary/10 border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{result.name}</p>
                  <p className="text-sm text-muted-foreground">{result.code}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold px-3 py-1 rounded ${getGradeColor(result.grade)}`}>{result.grade}</p>
                  <p className="text-sm text-primary font-semibold mt-1">{result.percentage.toFixed(1)}%</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Results */}
      {selected && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">{selected.name}</h3>
              <p className="text-muted-foreground text-sm">{selected.code}</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          {/* Marks Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background p-4 rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Quiz</p>
              <p className="text-2xl font-bold text-primary">{selected.quiz}/20</p>
              <p className="text-xs text-muted-foreground mt-1">{((selected.quiz / 20) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Assignment</p>
              <p className="text-2xl font-bold text-primary">{selected.assignment}/40</p>
              <p className="text-xs text-muted-foreground mt-1">{((selected.assignment / 40) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Midterm</p>
              <p className="text-2xl font-bold text-primary">{selected.midterm}/50</p>
              <p className="text-xs text-muted-foreground mt-1">{((selected.midterm / 50) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-background p-4 rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Final</p>
              <p className="text-2xl font-bold text-primary">{selected.final}/100</p>
              <p className="text-xs text-muted-foreground mt-1">{((selected.final / 100) * 100).toFixed(0)}%</p>
            </div>
          </div>

          {/* Total and Grade */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Total Marks</p>
              <p className="text-3xl font-bold text-primary">{selected.total}/200</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-muted-foreground text-sm mb-1">Percentage</p>
              <p className="text-3xl font-bold text-accent">{selected.percentage.toFixed(1)}%</p>
            </div>
            <div
              className={`rounded-lg p-4 border ${
                getGradeColor(selected.grade).includes("accent")
                  ? "bg-accent/10 border-accent/20"
                  : getGradeColor(selected.grade).includes("primary")
                    ? "bg-primary/10 border-primary/20"
                    : getGradeColor(selected.grade).includes("chart-3")
                      ? "bg-chart-3/10 border-chart-3/20"
                      : "bg-destructive/10 border-destructive/20"
              }`}
            >
              <p className="text-muted-foreground text-sm mb-1">Final Grade</p>
              <p className={`text-3xl font-bold ${getGradeColor(selected.grade)}`}>{selected.grade}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
