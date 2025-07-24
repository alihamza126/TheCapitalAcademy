"use client"

import { useState, useEffect } from "react"
import { Button } from "@heroui/react"
import { motion, AnimatePresence } from "framer-motion"
import WeekCard from "./week-card"
import PlannerHeader from "./planner-header"
import ProgressDashboard from "./progress-dashboard"
import Axios from "@/lib/Axios"

// Your existing hardcoded subjects data
const COURSE_DATA = {
  nums: {
    biology: [
      "Cell Structure and Function",
      "Cell Division",
      "Biomolecules",
      "Enzymes",
      "Photosynthesis",
      "Respiration",
      "Genetics and Heredity",
      "Molecular Genetics",
      "Evolution",
      "Ecology",
      "Human Physiology",
      "Plant Biology",
      "Animal Biology",
    ],
    chemistry: [
      "Atomic Structure",
      "Chemical Bonding",
      "States of Matter",
      "Chemical Equilibrium",
      "Acids and Bases",
      "Thermodynamics",
      "Electrochemistry",
      "Organic Chemistry Basics",
      "Hydrocarbons",
      "Functional Groups",
      "Alcohols and Phenols",
      "Aldehydes and Ketones",
    ],
    physics: [
      "Mechanics",
      "Work and Energy",
      "Waves and Oscillations",
      "Sound",
      "Light",
      "Electricity",
      "Magnetism",
      "Modern Physics",
      "Nuclear Physics",
      "Electronics",
    ],
    english: [
      "Grammar Fundamentals",
      "Sentence Structure",
      "Reading Comprehension",
      "Vocabulary Building",
      "Essay Writing",
      "Paragraph Writing",
      "Letter Writing",
    ],
  },
  mdcat: {
    biology: [
      "Cell Biology",
      "Biochemistry",
      "Human Physiology",
      "Genetics",
      "Evolution",
      "Ecology",
      "Reproduction",
      "Development",
      "Immunity",
      "Biotechnology",
    ],
    chemistry: [
      "Atomic Structure",
      "Chemical Bonding",
      "Thermodynamics",
      "Chemical Kinetics",
      "Organic Chemistry",
      "Biochemistry",
      "Environmental Chemistry",
      "Industrial Chemistry",
    ],
    physics: [
      "Mechanics",
      "Waves",
      "Electricity",
      "Modern Physics",
      "Medical Physics",
      "Thermodynamics",
      "Optics",
      "Electronics",
    ],
    english: ["Grammar", "Comprehension", "Vocabulary", "Essay Writing", "Paragraph Writing"],
    logic: [
      "Logical Reasoning",
      "Critical Thinking",
      "Problem Solving",
      "Analytical Reasoning",
      "Deductive Reasoning",
      "Inductive Reasoning",
    ],
  },
}

export default function StudyPlanner() {
  const [user, setUser] = useState({ id: "user123", name: "Student" }) // Replace with actual user data
  const [courseType, setCourseType] = useState("mdcat")
  const [totalWeeks, setTotalWeeks] = useState(12)
  const [completedWeeks, setCompletedWeeks] = useState<boolean[]>([])
  const [weeklyTopics, setWeeklyTopics] = useState<any>({})
  const [startDate, setStartDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [studyPlanId, setStudyPlanId] = useState<string | null>(null)

  // Calculate progress
  const completedCount = completedWeeks.filter(Boolean).length
  const progressPercentage = (completedCount / totalWeeks) * 100

  // Divide topics into weeks
  const divideTopicsIntoWeeks = (topics: string[], weeks: number) => {
    const topicsPerWeek = Math.ceil(topics.length / weeks)
    const result = []

    for (let i = 0; i < weeks; i++) {
      const start = i * topicsPerWeek
      const end = start + topicsPerWeek
      result.push(topics.slice(start, end))
    }

    return result
  }

  // Initialize weekly topics when course or weeks change
  useEffect(() => {
    const courseData = COURSE_DATA[courseType as keyof typeof COURSE_DATA]
    const weeklyData: any = {}

    Object.entries(courseData).forEach(([subject, topics]) => {
      weeklyData[subject] = divideTopicsIntoWeeks(topics, totalWeeks)
    })

    setWeeklyTopics(weeklyData)
    setCompletedWeeks(new Array(totalWeeks).fill(false))
  }, [courseType, totalWeeks])

  // Load existing study plan on component mount
  useEffect(() => {
    loadStudyPlan()
  }, [])

  // API functions for MongoDB
  const loadStudyPlan = async () => {
    try {
      setLoading(true)
      const response = await Axios.get(`/api/v1/planner/load`)
      const data = await response.data;
      console.log(response)

      if (data.success && data.studyPlan) {
        setCourseType(data.studyPlan.courseType)
        setTotalWeeks(data.studyPlan.totalWeeks)
        setCompletedWeeks(data.studyPlan.completedWeeks || new Array(data.studyPlan.totalWeeks).fill(false))
        setStartDate(new Date(data.studyPlan.startDate))
        setStudyPlanId(data.studyPlan._id)
      }
    } catch (error) {
      console.error("Error loading study plan:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveStudyPlan = async (planData: any) => {
    try {
      setLoading(true)
      const response = await Axios.post("/api/v1/planner/save", {
        studyPlanId,
        ...planData,
      })
      const data = response.data;

      if (data.success && data.studyPlan) {
        setStudyPlanId(data.studyPlan._id)
      }

      return data
    } catch (error) {
      console.error("Error saving study plan:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWeekComplete = async (weekIndex: number) => {
    const newCompletedWeeks = [...completedWeeks]
    newCompletedWeeks[weekIndex] = !newCompletedWeeks[weekIndex]
    setCompletedWeeks(newCompletedWeeks)

    // Save to MongoDB
    await saveStudyPlan({
      courseType,
      totalWeeks,
      completedWeeks: newCompletedWeeks,
      weekIndex,
      completedAt: new Date().toISOString(),
    })
  }

  const handlePlanChange = async () => {
    await saveStudyPlan({
      courseType,
      totalWeeks,
      completedWeeks,
      startDate: startDate.toISOString(),
    })
  }

  const getWeekDate = (weekIndex: number) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + weekIndex * 7)
    return date
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <PlannerHeader
          courseType={courseType}
          setCourseType={setCourseType}
          totalWeeks={totalWeeks}
          setTotalWeeks={setTotalWeeks}
          progressPercentage={progressPercentage}
          onPlanChange={handlePlanChange}
        />

        {/* Progress Dashboard */}
        <ProgressDashboard
          completedWeeks={completedCount}
          totalWeeks={totalWeeks}
          progressPercentage={progressPercentage}
          startDate={startDate}
        />

        {/* Weekly Plan */}
        <div className="space-y-6">
          <AnimatePresence>
            {Array.from({ length: totalWeeks }, (_, index) => (
              <motion.div
                key={`week-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <WeekCard
                  weekNumber={index + 1}
                  weekDate={getWeekDate(index)}
                  topics={weeklyTopics}
                  topicIndex={index}
                  isCompleted={completedWeeks[index]}
                  onComplete={() => handleWeekComplete(index)}
                  courseType={courseType}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handlePlanChange}
            isLoading={loading}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3"
            radius="lg"
          >
            {loading ? "Saving..." : "Save Progress"}
          </Button>
        </div>
      </div>
    </div>
  )
}
