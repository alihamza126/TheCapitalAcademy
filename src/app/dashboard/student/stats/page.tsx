"use client"

import { useState } from "react"
import { Card, Row, Col, Select, Progress, Tag, Button, Table, Statistic } from "antd"
import { motion } from "framer-motion"
import {
  TrophyOutlined,
  BarChartOutlined,
  LineChartOutlined,
  EyeOutlined,
  CalendarOutlined,
  RiseOutlined,
  StarOutlined,
} from "@ant-design/icons"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Mock student results data
const testResults = [
  {
    key: "1",
    testName: "MDCAT Mock Test #16",
    series: "MDCAT Complete Prep",
    date: "2024-01-20",
    score: 85.5,
    rank: 23,
    totalStudents: 234,
    totalMarks: 200,
    obtainedMarks: 171,
    timeTaken: 165, // minutes
    status: "completed",
  },
  {
    key: "2",
    testName: "Physics Chapter 13",
    series: "NUMS Physics",
    date: "2024-01-18",
    score: 78.2,
    rank: 45,
    totalStudents: 156,
    totalMarks: 100,
    obtainedMarks: 78,
    timeTaken: 85,
    status: "completed",
  },
  {
    key: "3",
    testName: "Chemistry Organic",
    series: "MDCAT Complete Prep",
    date: "2024-01-15",
    score: 92.3,
    rank: 8,
    totalStudents: 189,
    totalMarks: 150,
    obtainedMarks: 138,
    timeTaken: 120,
    status: "completed",
  },
  {
    key: "4",
    testName: "Biology Cell Structure",
    series: "MDCAT Complete Prep",
    date: "2024-01-12",
    score: 76.8,
    rank: 67,
    totalStudents: 203,
    totalMarks: 125,
    obtainedMarks: 96,
    timeTaken: 95,
    status: "completed",
  },
]

const performanceTrend = [
  { test: "Test 1", score: 72, rank: 89 },
  { test: "Test 2", score: 76, rank: 67 },
  { test: "Test 3", score: 78, rank: 56 },
  { test: "Test 4", score: 82, rank: 34 },
  { test: "Test 5", score: 85, rank: 23 },
  { test: "Test 6", score: 88, rank: 18 },
]

const subjectAnalysis = [
  { subject: "Physics", score: 82, fullMarks: 100 },
  { subject: "Chemistry", score: 88, fullMarks: 100 },
  { subject: "Biology", score: 75, fullMarks: 100 },
  { subject: "English", score: 91, fullMarks: 100 },
  { subject: "Logic", score: 68, fullMarks: 100 },
]

const strengthsWeaknesses = {
  strengths: ["Organic Chemistry", "English Grammar", "Mechanics", "Cell Biology"],
  weaknesses: ["Thermodynamics", "Genetics", "Logical Reasoning", "Inorganic Chemistry"],
  improving: ["Optics", "Ecology", "Vocabulary"],
}

export default function StudentResults() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedSeries, setSelectedSeries] = useState("all")

  const columns = [
    {
      title: "Test Details",
      key: "details",
      render: (record: any) => (
        <div>
          <div className="font-semibold text-slate-800">{record.testName}</div>
          <div className="text-sm text-slate-500">{record.series}</div>
          <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <CalendarOutlined />
            {record.date}
          </div>
        </div>
      ),
    },
    {
      title: "Score",
      key: "score",
      render: (record: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{record.score}%</div>
          <div className="text-sm text-slate-500">
            {record.obtainedMarks}/{record.totalMarks}
          </div>
        </div>
      ),
    },
    {
      title: "Rank",
      key: "rank",
      render: (record: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">#{record.rank}</div>
          <div className="text-sm text-slate-500">of {record.totalStudents}</div>
        </div>
      ),
    },
    {
      title: "Time",
      dataIndex: "timeTaken",
      key: "time",
      render: (time: number) => (
        <div className="text-center">
          <div className="font-medium">
            {Math.floor(time / 60)}h {time % 60}m
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color="green" className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="text" icon={<EyeOutlined />} className="text-blue-500 hover:text-blue-700">
          View Details
        </Button>
      ),
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">My Results & Analytics</h1>
            <p className="text-slate-600">Track your performance and identify areas for improvement</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedSeries} onChange={setSelectedSeries} className="w-48">
              <Select.Option value="all">All Test Series</Select.Option>
              <Select.Option value="mdcat">MDCAT Complete Prep</Select.Option>
              <Select.Option value="nums">NUMS Physics</Select.Option>
            </Select>
            <Select value={selectedPeriod} onChange={setSelectedPeriod} className="w-32">
              <Select.Option value="all">All Time</Select.Option>
              <Select.Option value="month">This Month</Select.Option>
              <Select.Option value="week">This Week</Select.Option>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Performance Summary */}
      <motion.div variants={itemVariants}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Tests Completed</span>}
                  value={24}
                  prefix={<TrophyOutlined className="text-blue-500" />}
                  suffix={
                    <div className="flex items-center gap-1 text-sm">
                      <RiseOutlined className="text-green-500" />
                      <span className="text-green-500">+3</span>
                    </div>
                  }
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
                  value={82.3}
                  suffix="%"
                  prefix={<BarChartOutlined className="text-green-500" />}
                  suffix={
                    <div className="flex items-center gap-1 text-sm">
                      <RiseOutlined className="text-green-500" />
                      <span className="text-green-500">+5.2%</span>
                    </div>
                  }
                  valueStyle={{ color: "#10b981", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Best Rank</span>}
                  value={8}
                  prefix={<StarOutlined className="text-purple-500" />}
                  suffix={
                    <div className="flex items-center gap-1 text-sm">
                      <RiseOutlined className="text-green-500" />
                      <span className="text-green-500">↑12</span>
                    </div>
                  }
                  valueStyle={{ color: "#8b5cf6", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Study Streak</span>}
                  value={12}
                  suffix="days"
                  prefix={<LineChartOutlined className="text-orange-500" />}
                  suffix={
                    <div className="flex items-center gap-1 text-sm">
                      <RiseOutlined className="text-green-500" />
                      <span className="text-green-500">+2</span>
                    </div>
                  }
                  valueStyle={{ color: "#f97316", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Charts Row */}
      <Row gutter={[24, 24]}>
        {/* Performance Trend */}
        <Col xs={24} lg={16}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <LineChartOutlined className="text-blue-500" />
                  <span className="text-lg font-semibold text-slate-800">Performance Trend</span>
                </div>
              }
              className="shadow-lg border-0"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="test" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Score (%)"
                  />
                  <Line yAxisId="right" type="monotone" dataKey="rank" stroke="#3b82f6" strokeWidth={3} name="Rank" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>

        {/* Subject Analysis Radar */}
        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <BarChartOutlined className="text-green-500" />
                  <span className="text-lg font-semibold text-slate-800">Subject Analysis</span>
                </div>
              }
              className="shadow-lg border-0"
            >
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={subjectAnalysis}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Subject Performance Details */}
      <motion.div variants={itemVariants}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <BarChartOutlined className="text-purple-500" />
              <span className="text-lg font-semibold text-slate-800">Subject-wise Performance</span>
            </div>
          }
          className="shadow-lg border-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {subjectAnalysis.map((subject, index) => (
              <motion.div
                key={subject.subject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-slate-50 rounded-lg"
              >
                <h4 className="font-semibold text-slate-800 mb-3">{subject.subject}</h4>
                <div className="mb-3">
                  <Progress
                    type="circle"
                    percent={subject.score}
                    size={80}
                    strokeColor={subject.score >= 85 ? "#10b981" : subject.score >= 70 ? "#f59e0b" : "#ef4444"}
                  />
                </div>
                <div className="text-sm text-slate-600">
                  {subject.score >= 85 ? "Excellent" : subject.score >= 70 ? "Good" : "Needs Improvement"}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Strengths and Weaknesses */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <TrophyOutlined className="text-green-500" />
                  <span className="text-lg font-semibold text-slate-800">Strengths</span>
                </div>
              }
              className="shadow-lg border-0 h-full"
            >
              <div className="space-y-2">
                {strengthsWeaknesses.strengths.map((strength, index) => (
                  <motion.div
                    key={strength}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tag color="green" className="w-full text-center py-2">
                      {strength}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <BarChartOutlined className="text-red-500" />
                  <span className="text-lg font-semibold text-slate-800">Areas to Improve</span>
                </div>
              }
              className="shadow-lg border-0 h-full"
            >
              <div className="space-y-2">
                {strengthsWeaknesses.weaknesses.map((weakness, index) => (
                  <motion.div
                    key={weakness}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tag color="red" className="w-full text-center py-2">
                      {weakness}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} lg={8}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <RiseOutlined className="text-blue-500" />
                  <span className="text-lg font-semibold text-slate-800">Improving</span>
                </div>
              }
              className="shadow-lg border-0 h-full"
            >
              <div className="space-y-2">
                {strengthsWeaknesses.improving.map((improving, index) => (
                  <motion.div
                    key={improving}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Tag color="blue" className="w-full text-center py-2">
                      {improving}
                    </Tag>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Test Results Table */}
      <motion.div variants={itemVariants}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <TrophyOutlined className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-800">Recent Test Results</span>
            </div>
          }
          className="shadow-lg border-0"
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            dataSource={testResults}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tests`,
            }}
            className="custom-table"
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
