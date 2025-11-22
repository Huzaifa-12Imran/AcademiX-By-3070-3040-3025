"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { Users, BookOpen, TrendingUp, CheckCircle2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const classPerformance = [
  { class: "CS-101", students: 45, avgGrade: 78 },
  { class: "CS-102", students: 42, avgGrade: 82 },
  { class: "CS-201", students: 38, avgGrade: 75 },
  { class: "CS-202", students: 40, avgGrade: 88 },
]

const attendanceVsGrade = [
  { attendance: 95, grade: 92 },
  { attendance: 88, grade: 85 },
  { attendance: 78, grade: 72 },
  { attendance: 92, grade: 89 },
  { attendance: 85, grade: 81 },
  { attendance: 75, grade: 68 },
]

interface TeacherDashboardProps {
  userName: string
  onLogout: () => void
}

export default function ModernTeacherDashboard({ userName, onLogout }: TeacherDashboardProps) {
  const handleCardAction = (label: string) => {
    // Map card label to likely heading text
    const map: Record<string, string> = {
      "Mark Attendance": "Your Classes",
      "Upload Marks": "Class Performance",
      "View Performance": "Class Performance",
      "Verify Results": "Your Classes",
    }
    const target = map[label] || label
    try {
      const candidates = Array.from(document.querySelectorAll("h2, h3, h4"))
      const el = candidates.find((e) => e.textContent && e.textContent.includes(target)) as HTMLElement | undefined
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
        return
      }
    } catch (e) {
      console.error(e)
    }
    alert(`${label} — section not found on this page.`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 px-6 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Welcome, {userName}</h1>
              <p className="text-muted-foreground">Manage your classes and track student progress</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="rounded-lg bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {}
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Mark Attendance", color: "from-primary to-secondary" },
            { icon: BookOpen, label: "Upload Marks", color: "from-secondary to-accent" },
            { icon: TrendingUp, label: "View Performance", color: "from-accent to-primary" },
            { icon: CheckCircle2, label: "Verify Results", color: "from-purple-500 to-pink-500" },
          ].map(({ icon: Icon, label, color }, i) => (
            <button key={i} onClick={() => handleCardAction(label)} className={`glass rounded-xl p-6 group hover:border-white/20 transition-all`}>
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {label}
              </p>
            </button>
          ))}
        </div>

        {}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Total Students</p>
            <div className="text-4xl font-bold text-foreground">165</div>
            <p className="text-sm text-secondary mt-2">Across 4 courses</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Attendance Mark</p>
            <div className="text-4xl font-bold text-secondary">87%</div>
            <p className="text-sm text-green-400 mt-2">+5% from last week</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Pending Reviews</p>
            <div className="text-4xl font-bold text-accent">12</div>
            <p className="text-sm text-muted-foreground mt-2">Grade submissions awaiting review</p>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Class Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" dataKey="class" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Bar dataKey="avgGrade" fill="oklch(0.62 0.26 180)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Attendance vs Grade Correlation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="attendance"
                  stroke="rgba(255,255,255,0.5)"
                  label={{ value: "Attendance %", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  label={{ value: "Grade %", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Scatter name="Students" data={attendanceVsGrade} fill="oklch(0.70 0.28 50)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-lg font-bold text-foreground mb-6">Your Classes</h3>
          <div className="space-y-4">
            {classPerformance.map((cls) => (
              <div
                key={cls.class}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cls.class}
                  </p>
                  <p className="text-sm text-muted-foreground">{cls.students} students enrolled</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{cls.avgGrade}%</p>
                  <p className="text-xs text-muted-foreground">Class average</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
