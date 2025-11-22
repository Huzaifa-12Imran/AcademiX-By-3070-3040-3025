"use client"

import { useState } from "react"

export default function AttendanceSummary() {
  const [selectedCourse, setSelectedCourse] = useState("CS101")

  const courseAttendance = [
    {
      code: "CS101",
      name: "Database Systems",
      total: 45,
      attended: 41,
      percentage: 91.1,
      status: "Good",
    },
    {
      code: "CS201",
      name: "Web Development",
      total: 40,
      attended: 34,
      percentage: 85,
      status: "Warning",
    },
    {
      code: "CS301",
      name: "Data Structures",
      total: 42,
      attended: 37,
      percentage: 88.1,
      status: "Good",
    },
  ]

  const selected = courseAttendance.find((c) => c.code === selectedCourse)
  const overallPercentage =
    (courseAttendance.reduce((a, b) => a + b.attended, 0) / courseAttendance.reduce((a, b) => a + b.total, 0)) * 100

  return (
    <div className="space-y-6">
      {/* Overall Attendance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Overall Attendance</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Overall</span>
              <span className="text-2xl font-bold text-primary">{overallPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-input rounded-full h-3">
              <div
                className="bg-gradient-to-r from-chart-1 to-accent h-3 rounded-full transition-all"
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Above 75% threshold ✓</p>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Attendance by Course</h3>
        <div className="space-y-3">
          {courseAttendance.map((course) => (
            <button
              key={course.code}
              onClick={() => setSelectedCourse(course.code)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedCourse === course.code
                  ? "bg-primary/10 border-primary"
                  : "bg-background border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-foreground">{course.name}</p>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    course.status === "Good" ? "bg-accent/10 text-accent" : "bg-chart-3/10 text-chart-3"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-input rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${course.percentage >= 85 ? "bg-accent" : "bg-chart-3"}`}
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="font-semibold text-foreground">{course.percentage.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {course.attended} of {course.total} classes
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      {selected && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">{selected.name} - Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Classes Attended</p>
              <p className="text-2xl font-bold text-primary">{selected.attended}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
              <p className="text-2xl font-bold text-foreground">{selected.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Absences</p>
              <p className="text-2xl font-bold text-destructive">{selected.total - selected.attended}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Percentage</p>
              <p className="text-2xl font-bold text-accent">{selected.percentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
