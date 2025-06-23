"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DonutChart } from "@/components/donut-chart"
import { StudentModal } from "@/components/student-modal"
import { Edit, Trash2 } from "lucide-react"

interface Student {
  id: number
  firstName: string
  lastName: string
  profilePicture: string
  passed: number
  redo: number
  pending: number
}

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  // Fetch all users on load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/users")
        const json = await res.json()
        if (res.ok) {
          setStudents(json.data)
        } else {
          console.error(json.message)
        }
      } catch (err) {
        console.error("Failed to fetch users", err)
      }
    }
    fetchStudents()
  }, [])

  const handleCreateStudent = () => {
    setEditingStudent(null)
    setIsModalOpen(true)
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setIsModalOpen(true)
  }

  const handleDeleteStudent = async (studentId: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return

    try {
      const res = await fetch(`/api/user/${studentId}`, { method: "DELETE" })
      const json = await res.json()
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== studentId))
      } else {
        console.error(json.message)
      }
    } catch (err) {
      console.error("Failed to delete student", err)
    }
  }

  const handleSaveStudent = async (data: Omit<Student, "id" | "profilePicture">) => {
    try {
      if (editingStudent) {
        // PUT /api/user/[id]
        const res = await fetch(`/api/user/${editingStudent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        })
        const json = await res.json()
        if (res.ok) {
          setStudents((prev) =>
            prev.map((s) => (s.id === editingStudent.id ? json.data : s)),
          )
        } else {
          console.error(json.message)
        }
      } else {
        // POST /api/users
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data
            // profilePicture:
            //   "https://i.pinimg.com/236x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
          }),
        })
        const json = await res.json()
        if (res.ok) {
          setStudents((prev) => [...prev, json.data])
        } else {
          console.error(json.message)
        }
      }

      setIsModalOpen(false)
      setEditingStudent(null)
    } catch (err) {
      console.error("Failed to save student", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <Button onClick={handleCreateStudent} variant="outline">
            Create
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((student) => (
            <Card key={student.id} className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={student.profilePicture === "no_image" ? "https://i.pinimg.com/236x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg" : student.profilePicture}
                    alt={`${student.firstName} ${student.lastName}`}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Exercises Tracked
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStudent(student)}
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Pass: {student.passed}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Redo: {student.redo}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Pending: {student.pending}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <DonutChart
                      passed={student.passed}
                      redo={student.redo}
                      pending={student.pending}
                      size={80}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <StudentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStudent(null)
          }}
          onSave={handleSaveStudent}
          student={editingStudent}
        />
      </div>
    </div>
  )
}
