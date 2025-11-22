"use client"

import { useState } from "react"
import ModernLogin from "@/components/modern-login"
import ModernStudentDashboard from "@/components/modern-student-dashboard"
import ModernTeacherDashboard from "@/components/modern-teacher-dashboard"
import ModernAdminDashboard from "@/components/modern-admin-dashboard"

type UserRole = "student" | "teacher" | "admin" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userName, setUserName] = useState<string>("")

  const handleLogout = () => {
    setUserRole(null)
    setUserName("")
  }

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role)
    setUserName(name)
  }

  return (
    <main className="min-h-screen bg-background">
      {!userRole ? (
        <ModernLogin onLogin={handleLogin} />
      ) : userRole === "admin" ? (
        <ModernAdminDashboard userName={userName} onLogout={handleLogout} />
      ) : userRole === "teacher" ? (
        <ModernTeacherDashboard userName={userName} onLogout={handleLogout} />
      ) : (
        <ModernStudentDashboard userName={userName} onLogout={handleLogout} />
      )}
    </main>
  )
}
