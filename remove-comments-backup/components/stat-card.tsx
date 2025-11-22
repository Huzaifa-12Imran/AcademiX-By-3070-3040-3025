"use client"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: string
}

export default function StatCard({ label, value, change, icon }: StatCardProps) {
  const isPositive = !change.includes("-") && change !== "All clear" && !change.includes("Warning")

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-accent" />
        ) : (
          <TrendingDown className="w-4 h-4 text-chart-3" />
        )}
        <span className={isPositive ? "text-accent" : "text-muted-foreground"}>{change}</span>
      </div>
    </div>
  )
}
