"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Student {
  id: number
  firstName: string
  lastName: string
  profilePicture: string
  passed: number
  redo: number
  pending: number
}

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (student: Omit<Student, "id">) => void
  student?: Student | null
}

export function StudentModal({ isOpen, onClose, onSave, student }: StudentModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    passed: 0,
    redo: 0,
    pending: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (student) {
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          profilePicture: student.profilePicture || "",
          passed: student.passed,
          redo: student.redo,
          pending: student.pending,
        })
      } else {
        setFormData({
          firstName: "",
          lastName: "",
          profilePicture: "",
          passed: 0,
          redo: 0,
          pending: 0,
        })
      }
      setErrors({})
    }
  }, [isOpen, student])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (formData.passed < 0) newErrors.passed = "Passed count cannot be negative"
    if (formData.redo < 0) newErrors.redo = "Redo count cannot be negative"
    if (formData.pending < 0) newErrors.pending = "Pending count cannot be negative"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        profilePicture: formData.profilePicture.trim() || "no_image",
        passed: formData.passed,
        redo: formData.redo,
        pending: formData.pending,
      })
    }
  }

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      profilePicture: "",
      passed: 0,
      redo: 0,
      pending: 0,
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Create New Student"}</DialogTitle>
          <DialogDescription>
            {student
              ? "Update the student's information and progress."
              : "Add a new student with their progress info."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* First Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
                placeholder="First Name"
              />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>
          </div>

          {/* Last Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="grid grid-cols-4 items-center gap-4">
            
            <div className="col-span-4">
              <Input
                id="profilePicture"
                value={formData.profilePicture}
                onChange={(e) => handleInputChange("profilePicture", e.target.value)}
                placeholder="Profile Image URL"
              />
            </div>
          </div>

          {/* Progress Section */}
          <div className="border-t pt-4 mt-2">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Exercise Progress</h4>

            {/* Passed */}
            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="passed" className="text-right text-green-600">
                Passed
              </Label>
              <div className="col-span-3">
                <Input
                  id="passed"
                  type="number"
                  min="0"
                  value={formData.passed}
                  onChange={(e) => handleInputChange("passed", parseInt(e.target.value) || 0)}
                  className={errors.passed ? "border-red-500" : ""}
                />
                {errors.passed && <p className="text-sm text-red-500 mt-1">{errors.passed}</p>}
              </div>
            </div>

            {/* Redo */}
            <div className="grid grid-cols-4 items-center gap-4 mb-3">
              <Label htmlFor="redo" className="text-right text-red-600">
                Redo
              </Label>
              <div className="col-span-3">
                <Input
                  id="redo"
                  type="number"
                  min="0"
                  value={formData.redo}
                  onChange={(e) => handleInputChange("redo", parseInt(e.target.value) || 0)}
                  className={errors.redo ? "border-red-500" : ""}
                />
                {errors.redo && <p className="text-sm text-red-500 mt-1">{errors.redo}</p>}
              </div>
            </div>

            {/* Pending */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pending" className="text-right text-orange-600">
                Pending
              </Label>
              <div className="col-span-3">
                <Input
                  id="pending"
                  type="number"
                  min="0"
                  value={formData.pending}
                  onChange={(e) => handleInputChange("pending", parseInt(e.target.value) || 0)}
                  className={errors.pending ? "border-red-500" : ""}
                />
                {errors.pending && <p className="text-sm text-red-500 mt-1">{errors.pending}</p>}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{student ? "Update Student" : "Create Student"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
