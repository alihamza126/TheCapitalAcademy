"use client"

import { Card, CardBody, CardHeader, Progress, Chip } from "@heroui/react"
import { BarChart3, Calendar, Clock, Target } from "lucide-react"

interface AnalyticsDashboardProps {
  analytics: any
  weeklyTrend: any[]
}

export default function AnalyticsDashboard({ analytics, weeklyTrend }: AnalyticsDashboardProps) {
  if (!analytics) {
    return (
      <Card className="shadow-lg">
        <CardBody className="p-6 text-center">
          <p className="text-gray-500">No analytics data available</p>
        </CardBody>
      </Card>
    )
  }

  const completedWeeksCount = weeklyTrend.filter((week) => week.isCompleted).length
  const totalWeeks = weeklyTrend.length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <CardBody className="p-4 text-white">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6" />
              <div>
                <p className="text-blue-100 text-xs">Completion Rate</p>
                <p className="text-xl font-bold">{Math.round(analytics.completionRate)}%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-green-500 to-green-600">
          <CardBody className="p-4 text-white">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              <div>
                <p className="text-green-100 text-xs">Completed Topics</p>
                <p className="text-xl font-bold">{analytics.completedTopics}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
          <CardBody className="p-4 text-white">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6" />
              <div>
                <p className="text-orange-100 text-xs">Study Time</p>
                <p className="text-xl font-bold">{Math.round(analytics.totalStudyTime / 60)}h</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
          <CardBody className="p-4 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6" />
              <div>
                <p className="text-purple-100 text-xs">Weeks Done</p>
                <p className="text-xl font-bold">
                  {completedWeeksCount}/{totalWeeks}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold">Subject Progress</h3>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="space-y-4">
            {Object.entries(analytics.subjectProgress || {}).map(([subject, progress]: [string, any]) => {
              const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0
              return (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Chip size="sm" variant="flat" className="capitalize">
                        {subject}
                      </Chip>
                      <span className="text-sm text-gray-600">
                        {progress.completed}/{progress.total} topics
                      </span>
                    </div>
                    <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                  </div>
                  <Progress value={percentage} color="primary" size="sm" radius="lg" />
                </div>
              )
            })}
          </div>
        </CardBody>
      </Card>

      {/* Weekly Trend */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {weeklyTrend.map((week, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    week.isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {week.weekNumber}
                </div>
                <p className="text-xs text-gray-500 mt-1">W{week.weekNumber}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
