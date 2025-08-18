"use client"

import { useEffect, useState } from "react"
import { Card, Row, Col, Select, Progress, Tag, Button, Table, Statistic, Spin, message } from "antd"
import { motion } from "framer-motion"
import {
  TrophyOutlined,
  BarChartOutlined,
  LineChartOutlined,
  EyeOutlined,
  CalendarOutlined,
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
import axios from "axios"
import Axios from "@/lib/Axios"

interface SeriesProgress {
  seriesId: string
  seriesTitle: string
  totalTests: number
  attemptedTests: number
  averageScore: number
  completionRate: number
  lastAttemptAt: string
  enrolledAt: string
  expiresAt: string
}

interface StudentProgressData {
  totalSeries: number
  totalTestsAvailable: number
  totalTestsAttempted: number
  averageScore: number
  completionRate: number
  seriesProgress: SeriesProgress[]
}

export default function StudentResults() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedSeries, setSelectedSeries] = useState("all")
  const [progressData, setProgressData] = useState<StudentProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await Axios.get(`/api/v1/series/progress/overall`)
        if (response.data.success) {
          setProgressData(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching progress data:", error)
        message.error("Failed to load progress data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const generateChartData = () => {
    if (!progressData) return []

    return progressData.seriesProgress.map((series, index) => ({
      test: `Series ${index + 1}`,
      score: series.averageScore,
      completion: series.completionRate,
    }))
  }

  const generateSubjectAnalysis = () => {
    if (!progressData) return []

    return progressData.seriesProgress.map((series) => ({
      subject: series.seriesTitle,
      score: series.averageScore,
      fullMarks: 100,
    }))
  }

  const generateTableData = () => {
    if (!progressData) return []

    return progressData.seriesProgress.map((series, index) => ({
      key: series.seriesId,
      testName: series.seriesTitle,
      series: series.seriesTitle,
      date: new Date(series.lastAttemptAt).toLocaleDateString(),
      score: series.averageScore,
      rank: Math.floor(Math.random() * 100) + 1, // Mock rank data
      totalStudents: Math.floor(Math.random() * 200) + 100, // Mock total students
      totalMarks: series.totalTests * 10, // Estimated total marks
      obtainedMarks: Math.floor((series.averageScore / 100) * series.totalTests * 10),
      timeTaken: Math.floor(Math.random() * 120) + 60, // Mock time data
      status: "completed",
      completionRate: series.completionRate,
      attemptedTests: series.attemptedTests,
      totalTests: series.totalTests,
    }))
  }

  const columns = [
    {
      title: "Series Details",
      key: "details",
      render: (record: any) => (
        <div>
          <div className="font-semibold text-slate-800">{record.testName}</div>
          <div className="text-sm text-slate-500">
            {record.attemptedTests}/{record.totalTests} tests completed
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <CalendarOutlined />
            {record.date}
          </div>
        </div>
      ),
    },
    {
      title: "Average Score",
      key: "score",
      render: (record: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{record.score.toFixed(1)}%</div>
          <div className="text-sm text-slate-500">
            {record.obtainedMarks}/{record.totalMarks}
          </div>
        </div>
      ),
    },
    {
      title: "Completion",
      key: "completion",
      render: (record: any) => (
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{record.completionRate.toFixed(1)}%</div>
          <div className="text-sm text-slate-500">
            {record.attemptedTests} of {record.totalTests}
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  if (!progressData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No progress data available</p>
      </div>
    )
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
              {progressData.seriesProgress.map((series) => (
                <Select.Option key={series.seriesId} value={series.seriesId}>
                  {series.seriesTitle}
                </Select.Option>
              ))}
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
                  value={progressData.totalTestsAttempted}
                  prefix={<TrophyOutlined className="text-blue-500" />}
                  suffix={
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-slate-500">of {progressData.totalTestsAvailable}</span>
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
                  value={progressData.averageScore}
                  suffix="%"
                  prefix={<BarChartOutlined className="text-green-500" />}
                  valueStyle={{ color: "#10b981", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Completion Rate</span>}
                  value={progressData.completionRate}
                  suffix="%"
                  prefix={<StarOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#8b5cf6", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <Statistic
                  title={<span className="text-slate-600 font-medium">Total Series</span>}
                  value={progressData.totalSeries}
                  prefix={<LineChartOutlined className="text-orange-500" />}
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
        <Col xs={24} lg={24}>
          <motion.div variants={itemVariants}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <LineChartOutlined className="text-blue-500" />
                  <span className="text-lg font-semibold text-slate-800">
                    Series Performance
                  </span>
                </div>
              }
              className="shadow-lg border-0"
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateChartData()}>
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
                    name="Average Score (%)"
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="completion"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Completion (%)"
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>


      {/* Series Performance Details */}
      <motion.div variants={itemVariants}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <BarChartOutlined className="text-purple-500" />
              <span className="text-lg font-semibold text-slate-800">Series-wise Performance</span>
            </div>
          }
          className="shadow-lg border-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progressData.seriesProgress.map((series, index) => (
              <motion.div
                key={series.seriesId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-slate-50 rounded-lg"
              >
                <h4 className="font-semibold text-slate-800 mb-3">{series.seriesTitle}</h4>
                <div className="mb-3">
                  <Progress
                    type="circle"
                    percent={series.averageScore}
                    size={80}
                    strokeColor={
                      series.averageScore >= 85 ? "#10b981" : series.averageScore >= 70 ? "#f59e0b" : "#ef4444"
                    }
                  />
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  {series.averageScore >= 85 ? "Excellent" : series.averageScore >= 70 ? "Good" : "Needs Improvement"}
                </div>
                <div className="text-xs text-slate-500">
                  {series.attemptedTests}/{series.totalTests} tests completed
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Test Results Table */}
      <motion.div variants={itemVariants}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <TrophyOutlined className="text-blue-500" />
              <span className="text-lg font-semibold text-slate-800">Series Progress</span>
            </div>
          }
          className="shadow-lg border-0"
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            dataSource={generateTableData()}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} series`,
            }}
            className="custom-table"
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}
