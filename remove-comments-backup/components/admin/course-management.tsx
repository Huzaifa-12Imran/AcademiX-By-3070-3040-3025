"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  instructor: string
  students: number
  section: string
  status: "active" | "archived"
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Database Systems",
      instructor: "Dr. Fatima Khan",
      students: 45,
      section: "A",
      status: "active",
    },
    {
      id: "2",
      code: "CS201",
      name: "Web Development",
      instructor: "Dr. Ahmed Ali",
      students: 38,
      section: "B",
      status: "active",
    },
    {
      id: "3",
      code: "CS301",
      name: "Data Structures",
      instructor: "Dr. Fatima Khan",
      students: 42,
      section: "A",
      status: "active",
    },
  ])

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Add Course Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Section</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Students</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-border hover:bg-background/50">
                <td className="px-6 py-3 text-sm font-semibold text-foreground">{course.code}</td>
                <td className="px-6 py-3 text-sm text-foreground">{course.name}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground">{course.instructor}</td>
                <td className="px-6 py-3 text-sm text-foreground">{course.section}</td>
                <td className="px-6 py-3 text-sm text-foreground font-medium">{course.students}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-accent/10 text-accent">Active</span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button className="p-1 text-muted-foreground hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
