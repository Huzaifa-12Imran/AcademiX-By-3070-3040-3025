"use client"

import type React from "react"
import { useState } from "react"
import { BookOpen, Lock, User } from "lucide-react"

interface LoginPortalProps {
  onLogin: (role: "student" | "teacher" | "admin", name: string) => void
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    if (!selectedRole) {
      setError("Please select a user role")
      return
    }

    // Demo authentication - in real app, validate against backend
    const name = email.split("@")[0]
    onLogin(selectedRole, name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Academic Portal</h1>
          <p className="text-muted-foreground">Student Attendance & Results Management System</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-3">Select Your Role</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { role: "student", label: "Student", icon: "👨‍🎓" },
              { role: "teacher", label: "Teacher", icon: "👨‍🏫" },
              { role: "admin", label: "Admin", icon: "⚙️" },
            ].map(({ role, label, icon }) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role as any)}
                className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground ring-2 ring-primary"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder={`Enter ${selectedRole || "your"} email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Sign In
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Demo Credentials:</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Email: demo@school.edu</p>
            <p>• Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
