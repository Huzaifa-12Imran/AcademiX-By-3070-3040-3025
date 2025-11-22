"use client"

import { useState } from "react"
import { BarChart3, Users, BookOpen, LogOut, Settings, TrendingUp } from "lucide-react"
import Sidebar from "./sidebar"
import StatCard from "./stat-card"
import UserManagement from "./admin/user-management"
import CourseManagement from "./admin/course-management"
import SystemReports from "./admin/system-reports"

interface AdminDashboardProps {
  userName: string
  onLogout: () => void
}

export default function AdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "reports", label: "System Reports", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        role="Admin"
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
              <h2 className="text-xl font-semibold text-foreground">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Students" value="1,247" change="+5.2%" icon="👨‍🎓" />
                <StatCard label="Total Teachers" value="156" change="+2.1%" icon="👨‍🏫" />
                <StatCard label="Active Courses" value="42" change="+12.5%" icon="📚" />
                <StatCard label="System Uptime" value="99.8%" change="Excellent" icon="✅" />
              </div>

              {/* System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Server Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">CPU Usage</span>
                      <span className="text-foreground font-medium">34%</span>
                    </div>
                    <div className="w-full bg-input rounded-full h-2">
                      <div className="bg-chart-1 h-2 rounded-full" style={{ width: "34%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Memory Usage</span>
                      <span className="text-foreground font-medium">62%</span>
                    </div>
                    <div className="w-full bg-input rounded-full h-2">
                      <div className="bg-chart-3 h-2 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-1.5"></div>
                      <div>
                        <p className="text-sm text-foreground">New course created: Data Science 101</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                      <div>
                        <p className="text-sm text-foreground">Bulk user import completed</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && <UserManagement />}
          {activeTab === "courses" && <CourseManagement />}
          {activeTab === "reports" && <SystemReports />}

          {activeTab === "settings" && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">System Settings</h2>
              <p className="text-muted-foreground">Configure system parameters, security, and integrations.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
