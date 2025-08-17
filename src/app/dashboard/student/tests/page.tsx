"use client"

import { useState } from "react"
import { Card, Button, Tag, Calendar, Badge, Avatar, Progress, Select } from "antd"
import { motion } from "framer-motion"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"
import type dayjs from "dayjs"

// Mock upcoming tests data
const upcomingTests = [
  {
    id: "1",
    title: "MDCAT Mock Test #17",
    series: "MDCAT Complete Prep 2024",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: 180,
    questions: 200,
    enrolled: true,
    status: "upcoming",
    daysLeft: 3,
  },
  {
    id: "2",
    title: "Physics Chapter 14 - Waves",
    series: "NUMS Physics Mastery",
    date: "2024-01-27",
    time: "2:00 PM",
    duration: 60,
    questions: 50,
    enrolled: true,
    status: "upcoming",
    daysLeft: 5,
  },
  {
    id: "3",
    title: "Chemistry Thermodynamics",
    series: "MDCAT Complete Prep 2024",
    date: "2024-01-30",
    time: "11:00 AM",
    duration: 90,
    questions: 75,
    enrolled: true,
    status: "upcoming",
    daysLeft: 8,
  },
  {
    id: "4",
    title: "Biology Genetics Test",
    series: "MDCAT Complete Prep 2024",
    date: "2024-02-02",
    time: "9:00 AM",
    duration: 120,
    questions: 100,
    enrolled: false,
    status: "available",
    daysLeft: 11,
  },
]

const completedTests = [
  {
    id: "1",
    title: "MDCAT Mock Test #16",
    series: "MDCAT Complete Prep 2024",
    date: "2024-01-20",
    score: 85.5,
    rank: 23,
    totalStudents: 234,
    status: "completed",
  },
  {
    id: "2",
    title: "Physics Chapter 13",
    series: "NUMS Physics Mastery",
    date: "2024-01-18",
    score: 78.2,
    rank: 45,
    totalStudents: 156,
    status: "completed",
  },
  {
    id: "3",
    title: "Chemistry Organic",
    series: "MDCAT Complete Prep 2024",
    date: "2024-01-15",
    score: 92.3,
    rank: 8,
    totalStudents: 189,
    status: "completed",
  },
]

export default function StudentTests() {
  const [selectedView, setSelectedView] = useState("upcoming")
  const [calendarView, setCalendarView] = useState(false)

  const getListData = (value: dayjs.Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD")
    return upcomingTests
      .filter((test) => test.date === dateStr)
      .map((test) => ({
        type: test.enrolled ? "success" : "warning",
        content: `${test.title} - ${test.time}`,
      }))
  }

  const dateCellRender = (value: dayjs.Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} className="text-xs" />
          </li>
        ))}
      </ul>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "blue"
      case "available":
        return "green"
      case "completed":
        return "default"
      default:
        return "default"
    }
  }

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 1) return "red"
    if (daysLeft <= 3) return "orange"
    if (daysLeft <= 7) return "blue"
    return "green"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Tests</h1>
          <p className="text-slate-600">Manage your upcoming tests and view completed results</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedView} onChange={setSelectedView} className="w-40">
            <Select.Option value="upcoming">Upcoming</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="all">All Tests</Select.Option>
          </Select>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => setCalendarView(!calendarView)}
            className={calendarView ? "bg-blue-50 text-blue-600 border-blue-300" : ""}
          >
            {calendarView ? "List View" : "Calendar"}
          </Button>
        </div>
      </div>

      {!calendarView ? (
        <>
          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-slate-600">Upcoming Tests</div>
                </div>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-slate-600">Completed Tests</div>
                </div>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">82.3%</div>
                  <div className="text-slate-600">Average Score</div>
                </div>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-slate-600">Best Rank</div>
                </div>
              </Card>
            </div>
          </motion.div>

          {selectedView === "upcoming" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-blue-500" />
                    <span className="text-lg font-semibold text-slate-800">Upcoming Tests</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="space-y-4">
                  {upcomingTests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar
                            size="large"
                            icon={<BookOutlined />}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600"
                          />
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">{test.title}</h4>
                            <p className="text-sm text-slate-500 mb-2">{test.series}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>
                                <CalendarOutlined className="mr-1" />
                                {test.date} at {test.time}
                              </span>
                              <span>
                                <ClockCircleOutlined className="mr-1" />
                                {test.duration} min
                              </span>
                              <span>{test.questions} questions</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div>
                            <Tag color={getUrgencyColor(test.daysLeft)} className="mb-2">
                              {test.daysLeft} days left
                            </Tag>
                          </div>
                          <div>
                            {test.enrolled ? (
                              <Button
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                className="bg-gradient-to-r from-green-500 to-blue-600 border-none"
                                disabled={test.daysLeft > 0}
                              >
                                {test.daysLeft === 0 ? "Start Test" : "Enrolled"}
                              </Button>
                            ) : (
                              <Button
                                type="primary"
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 border-none"
                              >
                                Enroll Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {test.daysLeft <= 1 && test.enrolled && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-600">
                            <ExclamationCircleOutlined />
                            <span className="font-medium">Test starts soon! Make sure you're prepared.</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {selectedView === "completed" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <CheckCircleOutlined className="text-green-500" />
                    <span className="text-lg font-semibold text-slate-800">Completed Tests</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="space-y-4">
                  {completedTests.map((test, index) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar
                            size="large"
                            icon={<CheckCircleOutlined />}
                            className="bg-gradient-to-r from-green-500 to-blue-600"
                          />
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-1">{test.title}</h4>
                            <p className="text-sm text-slate-500 mb-2">{test.series}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span>
                                <CalendarOutlined className="mr-1" />
                                {test.date}
                              </span>
                              <span>
                                Rank: {test.rank}/{test.totalStudents}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-green-600">{test.score}%</div>
                          <div>
                            <Button type="text" className="text-blue-500 hover:text-blue-700">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress
                          percent={test.score}
                          strokeColor={test.score >= 85 ? "#10b981" : test.score >= 70 ? "#f59e0b" : "#ef4444"}
                          showInfo={false}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </>
      ) : (
        /* Calendar View */
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <CalendarOutlined className="text-blue-500" />
                <span className="text-lg font-semibold text-slate-800">Test Calendar</span>
              </div>
            }
            className="shadow-lg border-0"
          >
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
