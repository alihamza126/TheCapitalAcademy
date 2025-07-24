"use client"

import { Card, CardBody, Chip, Button } from "@heroui/react"
import { CheckCircle2, Circle, Calendar } from "lucide-react"
import { motion } from "framer-motion"

interface WeekCardProps {
  weekNumber: number
  weekDate: Date
  topics: any
  topicIndex: number
  isCompleted: boolean
  onComplete: () => void
  courseType: string
}

const SUBJECT_COLORS = {
  biology: {
    bg: "bg-green/30",
    border: "border-green",
    text: "text-lime-600",
    chip: "success" as const,
  },
  chemistry: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    chip: "warning" as const,
  },
  physics: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    chip: "primary" as const,
  },
  english: {
    bg: "bg-rose-100",
    border: "border-red",
    text: "text-red",
    chip: "danger" as const,
  },
  logic: {
    bg: "bg-purple/40",
    border: "border-purple",
    text: "text-purple",
    chip: "primary" as const,
  },
}

export default function WeekCard({
  weekNumber,
  weekDate,
  topics,
  topicIndex,
  isCompleted,
  onComplete,
  courseType,
}: WeekCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  }

  const subjects =
    courseType === "nums"
      ? ["biology", "chemistry", "physics", "english"]
      : ["biology", "chemistry", "physics", "english", "logic"]

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className={`shadow-lg overflow-hidden ${isCompleted ? "bg-green/20 border-2 border-green" : "bg-white"}`}
        radius="lg"
      >
        <CardBody className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Week Info Sidebar */}
            <div
              className={`lg:w-48 p-6 ${
                isCompleted
                  ? "bg-gradient-to-br from-green/70 to-lime-500"
                  : "bg-gradient-to-br from-indigo-500 to-purple"
              } text-white flex flex-col items-center justify-center`}
            >
              <div className="text-center mb-4">
                <div className="flex items-center gap-2 mb-2 justify-center">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm opacity-90">{formatDate(weekDate)}</span>
                </div>
                <h3 className="text-2xl font-bold">Week {weekNumber}</h3>
              </div>

              <Button
                onClick={onComplete}
                className={`${
                  isCompleted ? "bg-white/20 hover:bg-white/30" : "bg-white/20 hover:bg-white/30"
                } text-white font-medium`}
                startContent={isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                radius="lg"
                size="sm"
              >
                {isCompleted ? "Completed" : "Mark Complete"}
              </Button>
            </div>

            {/* Topics Grid */}
            <div className="flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjects.map((subject) => {
                  const subjectTopics = topics[subject]?.[topicIndex] || []
                  const colors = SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS]

                  return (
                    <div key={subject} className={`${colors.bg} ${colors.border} border rounded-xl p-4`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Chip color={colors.chip} variant="solid" className="capitalize font-medium" size="sm">
                          {subject}
                        </Chip>
                      </div>

                      <ul className="space-y-2">
                        {subjectTopics.map((topic: string, index: number) => (
                          <li key={index} className={`text-sm ${colors.text} flex items-start gap-2`}>
                            <Chip size="sm" variant="flat" className="min-w-6 h-6 text-xs font-medium bg-white">
                              {index + 1}
                            </Chip>
                            <span className="flex-1 leading-relaxed">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
