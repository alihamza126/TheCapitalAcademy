"use client"

import { useState, useEffect } from "react"
import { Button, Spinner } from "@heroui/react"
import { motion, AnimatePresence } from "framer-motion"
import WeekCard from "./week-card"
import PlannerHeader from "./planner-header"
import ProgressDashboard from "./progress-dashboard"
import Axios from "@/lib/Axios"
import { mdcatBioChapters, mdcatChemistryChapters, mdcatEnglishChapters, mdcatLogicChapter, mdcatPhysicsChapters, numsBioChapters, numsChemistryChapters, numsEnglishChapters, numsPhysicsChapters } from "@/data/chaperts"

// Your existing hardcoded subjects data
const COURSE_DATA = {
  nums: {
    biology: numsBioChapters.map(chapter => chapter.name),
    chemistry: numsChemistryChapters.map(chapter => chapter.name),
    physics: numsPhysicsChapters.map(chapter => chapter.name),
    english: numsEnglishChapters.map(chapter => chapter.name)
  },
  mdcat: {
    biology: mdcatBioChapters.map(chapter => chapter.name),
    chemistry: mdcatChemistryChapters.map(chapter => chapter.name),
    physics: mdcatPhysicsChapters.map(chapter => chapter.name),
    english: mdcatEnglishChapters.map(chapter => chapter.name),
    logic: mdcatLogicChapter.map(chapter => chapter.name)
  },
}

export default function StudyPlanner() {
  const [courseType, setCourseType] = useState("mdcat")
  const [totalWeeks, setTotalWeeks] = useState(12)
  const [completedWeeks, setCompletedWeeks] = useState<boolean[]>([])
  const [weeklyTopics, setWeeklyTopics] = useState<any>({})
  const [startDate, setStartDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [studyPlanId, setStudyPlanId] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Calculate progress
  const completedCount = completedWeeks.filter(Boolean).length
  const progressPercentage = totalWeeks > 0 ? Math.round((completedCount / totalWeeks) * 100) : 0

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

  // Initialize weekly topics based on current course and weeks
  const initializeWeeklyTopics = () => {
    const courseData = COURSE_DATA[courseType as keyof typeof COURSE_DATA]
    const weeklyData: any = {}

    Object.entries(courseData).forEach(([subject, topics]) => {
      weeklyData[subject] = divideTopicsIntoWeeks(topics, totalWeeks)
    })

    setWeeklyTopics(weeklyData)
  }

  // Load existing study plan
  const loadStudyPlan = async () => {
    try {
      setLoading(true)
      const response = await Axios.get(`/api/v1/planner/load`)
      const data = await response.data

      if (data.success && data.studyPlan) {
        // First set all the loaded data
        setCourseType(data.studyPlan.courseType)
        setTotalWeeks(data.studyPlan.totalWeeks)
        setCompletedWeeks(data.studyPlan.completedWeeks)
        setStartDate(new Date(data.studyPlan.startDate))
        setStudyPlanId(data.studyPlan._id)

        // Then initialize weekly topics based on loaded data
        const courseData = COURSE_DATA[data.studyPlan.courseType as keyof typeof COURSE_DATA]
        const weeklyData: any = {}
        Object.entries(courseData).forEach(([subject, topics]) => {
          weeklyData[subject] = divideTopicsIntoWeeks(topics, data.studyPlan.totalWeeks)
        })
        setWeeklyTopics(weeklyData)
      } else {
        // If no saved plan, initialize with defaults
        initializeWeeklyTopics()
        setCompletedWeeks(new Array(totalWeeks).fill(false))
      }
    } catch (error) {
      console.error("Error loading study plan:", error)
      // Fallback to default initialization if load fails
      initializeWeeklyTopics()
      setCompletedWeeks(new Array(totalWeeks).fill(false))
    } finally {
      setLoading(false)
      setHasLoaded(true)
    }
  }

  // Save study plan to backend
  const saveStudyPlan = async (planData: any) => {
    try {
      setLoading(true)
      const response = await Axios.post("/api/v1/planner/save", {
        studyPlanId,
        ...planData,
      })
      const data = response.data

      if (data.success && data.studyPlan) {
        setStudyPlanId(data.studyPlan._id)
      }

      return data
    } catch (error) {
      console.error("Error saving study plan:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Handle when a week is marked complete/incomplete
  const handleWeekComplete = async (weekIndex: number) => {
    const newCompletedWeeks = [...completedWeeks]
    newCompletedWeeks[weekIndex] = !newCompletedWeeks[weekIndex]
    setCompletedWeeks(newCompletedWeeks)

    await saveStudyPlan({
      courseType,
      totalWeeks,
      completedWeeks: newCompletedWeeks,
      weekIndex,
      completedAt: new Date().toISOString(),
    })
  }

  // Handle when the plan settings change
  const handlePlanChange = async () => {
    await saveStudyPlan({
      courseType,
      totalWeeks,
      completedWeeks,
      startDate: startDate.toISOString(),
    })
    // Reinitialize topics with new settings
    initializeWeeklyTopics()
  }

  // Calculate the date for a specific week
  const getWeekDate = (weekIndex: number) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + weekIndex * 7)
    return date
  }

  // Load data on component mount
  useEffect(() => {
    loadStudyPlan()
  }, [])

  // Update completed weeks array when total weeks changes
  useEffect(() => {
    if (hasLoaded) {
      const newCompletedWeeks = [...completedWeeks]
      if (totalWeeks > completedWeeks.length) {
        // Add new weeks as incomplete
        newCompletedWeeks.push(...new Array(totalWeeks - completedWeeks.length).fill(false))
      } else if (totalWeeks < completedWeeks.length) {
        // Remove extra weeks
        newCompletedWeeks.splice(totalWeeks)
      }
      setCompletedWeeks(newCompletedWeeks)
    }
  }, [totalWeeks, hasLoaded])

  if (!hasLoaded) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner variant="wave" /></div>
  }

  return (
    <div className="min-h-screen">
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
                  isCompleted={completedWeeks[index] || false}
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
            onPress={handlePlanChange}
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