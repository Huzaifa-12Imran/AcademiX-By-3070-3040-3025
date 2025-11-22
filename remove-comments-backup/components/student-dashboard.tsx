"use client"

import { useState } from "react"
import { BarChart3, BookOpen, LogOut, TrendingUp } from "lucide-react"
import Sidebar from "./sidebar"
import StatCard from "./stat-card"
import AttendanceSummary from "./student/attendance-summary"
import ResultsView from "./student/results-view"

interface StudentDashboardProps {
  userName: string
  onLogout: () => void
}

export default function StudentDashboard({ userName, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "attendance", label: "Attendance", icon: TrendingUp },
    { id: "results", label: "Results", icon: BookOpen },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        role="Student"
        userName={userName}
        items={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 bg-card border-b border-border px-8 py-4 flex justify-between items-center z-40">
          <h1 className="text-2xl font-bold text-foreground">
            {sidebarItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Welcome back, {userName}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Overall Attendance" value="88%" change="Above threshold" icon="✅" />
                <StatCard label="Enrolled Courses" value="6" change="This semester" icon="📚" />
                <StatCard label="Current GPA" value="3.72" change="Excellent standing" icon="⭐" />
                <StatCard label="Alerts" value="0" change="All clear" icon="🔔" />
              </div>

              {/* Quick Stats by Course */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Your Courses Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Database Systems", attendance: 92, grade: "A", status: "Good" },
                    { name: "Web Development", attendance: 85, grade: "B+", status: "Warning" },
                    { name: "Data Structures", attendance: 88, grade: "A-", status: "Good" },
                    { name: "Advanced Algorithms", attendance: 90, grade: "A", status: "Good" },
                  ].map((course, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-foreground">{course.name}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            course.status === "Good" ? "bg-accent/10 text-accent" : "bg-chart-3/10 text-chart-3"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Attendance</p>
                          <p className="text-lg font-semibold text-foreground">{course.attendance}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Grade</p>
                          <p className="text-lg font-semibold text-primary">{course.grade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && <AttendanceSummary />}
          {activeTab === "results" && <ResultsView />}
        </div>
      </main>
    </div>
  )
}
