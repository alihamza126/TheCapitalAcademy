"use client"

import { Card, Row, Col, Progress, Button, List, Tag, Avatar, Statistic } from "antd"
import { motion } from "framer-motion"
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  RightOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const upcomingTests = [
  {
    id: "1",
    title: "MDCAT Mock Test #16",
    series: "MDCAT Complete Prep",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "180 min",
    questions: 200,
  },
  {
    id: "2",
    title: "Physics Chapter 13",
    series: "NUMS Physics",
    date: "2024-01-22",
    time: "2:00 PM",
    duration: "60 min",
    questions: 50,
  },
  {
    id: "3",
    title: "Chemistry Organic",
    series: "MDCAT Complete Prep",
    date: "2024-01-25",
    time: "11:00 AM",
    duration: "90 min",
    questions: 75,
  },
]

const recentResults = [
  {
    id: "1",
    title: "MDCAT Mock Test #15",
    score: 78.5,
    rank: 45,
    totalStudents: 234,
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Physics Laws of Motion",
    score: 85.2,
    rank: 12,
    totalStudents: 89,
    date: "2024-01-12",
  },
  {
    id: "3",
    title: "Chemistry Bonding",
    score: 72.8,
    rank: 67,
    totalStudents: 156,
    date: "2024-01-10",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function StudentDashboard() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, John!</h1>
            <p className="text-slate-600">Ready to ace your next test? Let's continue your preparation.</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 border-none shadow-lg hover:shadow-xl"
            >
              Start Practice
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Tests Completed</span>}
                  value={24}
                  prefix={<BookOutlined className="text-blue-500" />}
                  valueStyle={{ color: "#3b82f6", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Average Score</span>}
                  value={78.5}
                  suffix="%"
                  prefix={<TrophyOutlined className="text-green-500" />}
                  valueStyle={{ color: "#10b981", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Best Rank</span>}
                  value={12}
                  prefix={<FireOutlined className="text-orange-500" />}
                  valueStyle={{ color: "#f97316", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Study Streak</span>}
                  value={7}
                  suffix="days"
                  prefix={<ClockCircleOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#8b5cf6", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Upcoming Tests */}
        <Col xs={24} lg={14}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-blue-500" />
                    <span className="text-lg font-semibold text-slate-800">Upcoming Tests</span>
                  </div>
                  <Link href="/student/tests">
                    <Button type="text" icon={<RightOutlined />} className="text-blue-500 hover:text-blue-700">
                      View All
                    </Button>
                  </Link>
                </div>
              }
              className="shadow-lg border-0"
            >
              <List
                dataSource={upcomingTests}
                renderItem={(test, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <List.Item className="hover:bg-slate-50 rounded-lg p-4 transition-colors">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <Avatar
                            size="large"
                            icon={<BookOutlined />}
                            className="bg-gradient-to-r from-blue-500 to-indigo-600"
                          />
                          <div>
                            <div className="font-semibold text-slate-800">{test.title}</div>
                            <div className="text-sm text-slate-500">{test.series}</div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-slate-400">
                                <CalendarOutlined className="mr-1" />
                                {test.date} at {test.time}
                              </span>
                              <span className="text-xs text-slate-400">
                                <ClockCircleOutlined className="mr-1" />
                                {test.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Tag color="blue" className="mb-2">
                            {test.questions} Questions
                          </Tag>
                          <div>
                            <Button
                              type="primary"
                              size="small"
                              className="bg-gradient-to-r from-green-500 to-blue-600 border-none"
                            >
                              Start Test
                            </Button>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  </motion.div>
                )}
              />
            </Card>
          </motion.div>
        </Col>

        {/* Recent Results & Progress */}
        <Col xs={24} lg={10}>
          <div className="space-y-6">
            {/* Recent Results */}
            <motion.div variants={itemVariants}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <TrophyOutlined className="text-green-500" />
                    <span className="text-lg font-semibold text-slate-800">Recent Results</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{result.title}</div>
                        <div className="text-xs text-slate-500">{result.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{result.score}%</div>
                        <div className="text-xs text-slate-500">
                          Rank {result.rank}/{result.totalStudents}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Subject Progress */}
            <motion.div variants={itemVariants}>
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <FireOutlined className="text-orange-500" />
                    <span className="text-lg font-semibold text-slate-800">Subject Progress</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Physics</span>
                      <span className="text-blue-600 font-semibold">85%</span>
                    </div>
                    <Progress percent={85} strokeColor="#3b82f6" showInfo={false} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Chemistry</span>
                      <span className="text-green-600 font-semibold">78%</span>
                    </div>
                    <Progress percent={78} strokeColor="#10b981" showInfo={false} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">Biology</span>
                      <span className="text-orange-600 font-semibold">72%</span>
                    </div>
                    <Progress percent={72} strokeColor="#f97316" showInfo={false} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600">English</span>
                      <span className="text-purple-600 font-semibold">68%</span>
                    </div>
                    <Progress percent={68} strokeColor="#8b5cf6" showInfo={false} />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Col>
      </Row>
    </motion.div>
  )
}
