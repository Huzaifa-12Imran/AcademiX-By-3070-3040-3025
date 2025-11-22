"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ModernLoginProps {
  onLogin: (role: "admin" | "teacher" | "student", name: string) => void
}

export default function ModernLogin({ onLogin }: ModernLoginProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "teacher" | "student" | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleLogin = () => {
    if (selectedRole && name) {
      onLogin(selectedRole, name)
    }
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden relative ribbon-wrapper">
        {/* Gradient ribbon behind content */}
        <div aria-hidden className="gradient-ribbon">
          <svg width="100%" height="100%" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mg1" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#D86A49" />
                <stop offset="50%" stopColor="#2B8AF7" />
                <stop offset="100%" stopColor="#D86A49" />
              </linearGradient>
            </defs>
            <path d="M0 120 C200 20, 400 240, 600 140 C800 40, 1000 220, 1200 120 L1200 300 L0 300 Z" fill="url(#mg1)" />
            <path d="M0 140 C200 40, 400 260, 600 160 C800 60, 1000 240, 1200 140 L1200 300 L0 300 Z" fill="url(#mg1)" opacity="0.6" />
          </svg>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-2xl">
            {}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl font-bold gradient-text">AcademiX</h1>
              </div>
              <p className="text-muted-foreground text-lg mb-2">Student Attendance & Results Portal</p>
              <p className="text-muted-foreground">Choose your role to continue</p>
            </div>

            {}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { role: "student" as const, title: "Student", desc: "View attendance & grades", icon: "🎓" },
                { role: "teacher" as const, title: "Teacher", desc: "Mark attendance & upload marks", icon: "👨‍🏫" },
                { role: "admin" as const, title: "Administrator", desc: "System management", icon: "⚙️" },
              ].map(({ role, title, desc, icon }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className="group glass rounded-2xl p-8 text-left hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                >
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-semibold">Select</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8">
          <div className="mb-8">
            <button
              onClick={() => {
                setSelectedRole(null)
                setName("")
                setEmail("")
              }}
              className="text-primary hover:text-primary/80 text-sm font-semibold mb-6 flex items-center gap-2"
            >
              ← Back to roles
            </button>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {selectedRole === "student" ? "Student" : selectedRole === "teacher" ? "Teacher" : "Admin"}
            </h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Full Name</label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Email</label>
              <Input
                type="email"
                placeholder="your.email@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <Button
            onClick={handleLogin}
            disabled={!name}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30 rounded-xl py-3 font-semibold text-lg transition-all duration-300"
          >
            Sign In
          </Button>

          <p className="text-center text-muted-foreground text-xs mt-6">Secure login with end-to-end encryption</p>
        </div>
      </div>
    </div>
  )
}
