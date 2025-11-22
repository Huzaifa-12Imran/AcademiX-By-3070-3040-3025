"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUp, TrendingUp, Award, AlertCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const attendanceData = [
  { week: "W1", percentage: 95 },
  { week: "W2", percentage: 92 },
  { week: "W3", percentage: 88 },
  { week: "W4", percentage: 85 },
  { week: "W5", percentage: 82 },
  { week: "W6", percentage: 78 },
]

const gradeData = [
  { name: "Quiz", value: 85, fill: "oklch(0.65 0.28 290)" },
  { name: "Assignment", value: 90, fill: "oklch(0.62 0.26 180)" },
  { name: "Midterm", value: 88, fill: "oklch(0.70 0.28 50)" },
]

interface StudentDashboardProps {
  userName: string
  onLogout: () => void
}

export default function ModernStudentDashboard({ userName, onLogout }: StudentDashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 px-6 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Welcome back, {userName}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Your learning journey continues
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="rounded-lg bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Attendance</p>
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">78%</div>
              <p className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Below 75% threshold
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-secondary/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Overall GPA</p>
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">3.72</div>
              <p className="text-sm text-green-400 flex items-center gap-1">
                <ArrowUp className="w-4 h-4" />
                +0.15 this semester
              </p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-accent/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Active Courses</p>
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-accent">📚</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">6</div>
              <p className="text-sm text-muted-foreground">All enrolled and active</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                  cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="oklch(0.65 0.28 290)"
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.65 0.28 290)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Assessment Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Courses List */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-lg font-bold text-foreground mb-6">Your Courses</h3>
          <div className="space-y-4">
            {["Data Structures", "Web Development", "Database Systems", "Software Engineering"].map((course, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">{course}</p>
                  <p className="text-sm text-muted-foreground">Prof. Johnson • Sem 2</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{85 + i * 2}%</p>
                  <p className="text-xs text-muted-foreground">Grade: {String.fromCharCode(65 + i)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
