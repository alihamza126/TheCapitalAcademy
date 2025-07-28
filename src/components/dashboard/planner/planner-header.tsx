"use client"

import { Card, CardBody, Select, SelectItem, Progress } from "@heroui/react"
import { GraduationCap } from "lucide-react"

interface PlannerHeaderProps {
  courseType: string
  setCourseType: (value: string) => void
  totalWeeks: number
  setTotalWeeks: (value: number) => void
  progressPercentage: number
  onPlanChange: () => void
}

export default function PlannerHeader({
  courseType,
  setCourseType,
  totalWeeks,
  setTotalWeeks,
  progressPercentage,
  onPlanChange,
}: PlannerHeaderProps) {
  const handleCourseChange = (value: string) => {
    setCourseType(value)
    setTimeout(onPlanChange, 100) // Save after state update
  }

  const handleWeeksChange = (value: string) => {
    setTotalWeeks(Number.parseInt(value))
    setTimeout(onPlanChange, 100) // Save after state update
  }

  return (
    <div className="mb-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple to-pink rounded-full">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent">
            Capital Academy Study Planner
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Plan your success, track your progress</p>
      </div>

      {/* Controls */}
      <Card className="mb-6 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* Course Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Type</label>
              <Select
                selectedKeys={[courseType]}
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys)[0] as string
                  handleCourseChange(selectedValue)
                }}
                placeholder="Select course type"
                className="w-full"
                size="lg"
                radius="lg"
              >
                <SelectItem key="nums" title="nums">
                  NUMS
                </SelectItem>
                <SelectItem key="mdcat" title="mdcat" >
                  MDCAT
                </SelectItem>
              </Select>
            </div>

            {/* Weeks Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Study Duration</label>
              <Select
                selectedKeys={[totalWeeks.toString()]}
                onSelectionChange={(keys) => {
                  const selectedValue = Array.from(keys)[0] as string
                  handleWeeksChange(selectedValue)
                }}
                placeholder="Select duration"
                className="w-full"
                size="lg"
                radius="lg"
              >
                {Array.from({ length: 11 }, (_, i) => i + 6).map((week) => (
                  <SelectItem key={week.toString()} title={week.toString()}>
                    {week} Weeks
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Overall Progress</label>
              <div className="space-y-2">
                <Progress value={progressPercentage} className="w-full" color="primary" size="lg" radius="lg" />
                <p className="text-sm text-gray-600 text-center font-medium">
                  {Math.round(progressPercentage)}% Complete
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
