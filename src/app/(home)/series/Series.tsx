"use client"

import { useState } from "react"
import { Card, Row, Col, Button, Tag, Progress, Input, Select, Modal, message } from "antd"
import { motion } from "framer-motion"
import {
  BookOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SearchOutlined,
  FilterOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons"

const { Search } = Input

const testSeriesData = [
  {
    id: "1",
    title: "MDCAT Complete Preparation 2024",
    description: "Comprehensive test series covering all MDCAT subjects with detailed explanations",
    subjects: ["Physics", "Chemistry", "Biology", "English"],
    totalTests: 15,
    completedTests: 8,
    enrolledStudents: 234,
    price: 2500,
    originalPrice: 3500,
    difficulty: "Mixed",
    duration: "6 months",
    isEnrolled: true,
    rating: 4.8,
    imageUrl: "https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg",
  },
  {
    id: "2",
    title: "NUMS Physics Mastery",
    description: "Advanced physics preparation for NUMS entrance with problem-solving techniques",
    subjects: ["Physics"],
    totalTests: 8,
    completedTests: 0,
    enrolledStudents: 89,
    price: 1500,
    originalPrice: 2000,
    difficulty: "Hard",
    duration: "4 months",
    isEnrolled: false,
    rating: 4.6,
    imageUrl: "https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg",
  },
  {
    id: "3",
    title: "Chemistry Quick Revision",
    description: "Last-minute chemistry preparation with high-yield topics and practice tests",
    subjects: ["Chemistry"],
    totalTests: 5,
    completedTests: 5,
    enrolledStudents: 156,
    price: 800,
    originalPrice: 1200,
    difficulty: "Medium",
    duration: "2 months",
    isEnrolled: true,
    rating: 4.4,
    imageUrl: "https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg",
  },
  {
    id: "4",
    title: "Biology Comprehensive Course",
    description: "Complete biology coverage from basics to advanced topics for medical entrance",
    subjects: ["Biology"],
    totalTests: 12,
    completedTests: 0,
    enrolledStudents: 198,
    price: 2000,
    originalPrice: 2800,
    difficulty: "Mixed",
    duration: "5 months",
    isEnrolled: false,
    rating: 4.7,
    imageUrl: "https://www.modernenglishteacher.com/media/26176/rsz_testing_2.jpg",
  },
]

const subjectColors = {
  Physics: "blue",
  Chemistry: "green",
  Biology: "orange",
  English: "purple",
}

const difficultyColors = {
  Easy: "green",
  Medium: "orange",
  Hard: "red",
  Mixed: "blue",
}

export default function TestSeriesPage() {
  const [searchText, setSearchText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [enrollModalVisible, setEnrollModalVisible] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<any>(null)

  const handleEnroll = (series: any) => {
    setSelectedSeries(series)
    setEnrollModalVisible(true)
  }

  const confirmEnrollment = () => {
    message.success(`Successfully enrolled in ${selectedSeries?.title}!`)
    setEnrollModalVisible(false)
    setSelectedSeries(null)
  }

  const filteredSeries = testSeriesData.filter((series) => {
    const matchesSearch =
      series.title.toLowerCase().includes(searchText.toLowerCase()) ||
      series.description.toLowerCase().includes(searchText.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "enrolled" && series.isEnrolled) ||
      (selectedFilter === "available" && !series.isEnrolled)

    return matchesSearch && matchesFilter
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
     

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-md border-0">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <Search
                placeholder="Search test series..."
                allowClear
                size="large"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full"
              />
            </div>

            <Select value={selectedFilter} onChange={setSelectedFilter} size="large" className="w-40">
              <Select.Option value="all">All Series</Select.Option>
              <Select.Option value="enrolled">My Enrolled</Select.Option>
              <Select.Option value="available">Available</Select.Option>
            </Select>
          </div>
        </Card>
      </motion.div>

      {/* Test Series Grid */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Row gutter={[24, 24]}>
          {filteredSeries.map((series, index) => (
            <Col xs={24} lg={8} key={series.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  className="shadow-lg border-0 h-full overflow-hidden"
                  cover={
                    <div className="relative">
                      <img
                        alt={series.title}
                        src={series.imageUrl || "/placeholder.svg"}
                        className="h-48 w-full object-cover"
                      />
                      {series.isEnrolled && (
                        <div className="absolute top-4 right-4">
                          <Tag color="green" icon={<CheckCircleOutlined />}>
                            Enrolled
                          </Tag>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <Tag color={difficultyColors[series.difficulty as keyof typeof difficultyColors]}>
                          {series.difficulty}
                        </Tag>
                      </div>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    {/* Title and Rating */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{series.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <StarOutlined className="text-yellow-500" />
                          <span className="font-medium">{series.rating}</span>
                        </div>
                        {/* <span className="text-slate-400">•</span> */}
                        {/* <span className="text-sm text-slate-600">by {series.instructor}</span> */}
                      </div>
                      <p className="text-slate-600 text-sm">{series.description}</p>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1">
                      {series.subjects.map((subject) => (
                        <Tag key={subject} color={subjectColors[subject as keyof typeof subjectColors]} size="small">
                          {subject}
                        </Tag>
                      ))}
                    </div>

                    {/* Progress (if enrolled)
                    {series.isEnrolled && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-600">Progress</span>
                          <span className="text-sm font-medium text-blue-600">
                            {series.completedTests}/{series.totalTests} tests
                          </span>
                        </div>
                        <Progress
                          percent={Math.round((series.completedTests / series.totalTests) * 100)}
                          strokeColor="#3b82f6"
                          showInfo={false}
                        />
                      </div>
                    )} */}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <BookOutlined />
                        <span>{series.totalTests} Tests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserOutlined />
                        <span>{series.enrolledStudents} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockCircleOutlined />
                        <span>{series.duration}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">Pkr {series.price}</span>
                          <span className="text-sm text-slate-400 line-through">Pkr {series.originalPrice}</span>
                        </div>
                        <div className="text-xs text-green-600">Save Pkr {series.originalPrice - series.price}</div>
                      </div>

                      {series.isEnrolled ? (
                        <Button
                          type="primary"
                          icon={<PlayCircleOutlined />}
                          className="bg-gradient-to-r from-green-500 to-blue-600 border-none"
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => handleEnroll(series)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 border-none"
                        >
                          Enroll Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Enrollment Modal */}
      <Modal
        title="Confirm Enrollment"
        open={enrollModalVisible}
        onOk={confirmEnrollment}
        onCancel={() => setEnrollModalVisible(false)}
        okText="Enroll Now"
        cancelText="Cancel"
        className="enrollment-modal"
      >
        {selectedSeries && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-800">{selectedSeries.title}</h4>
              <p className="text-slate-600 text-sm">{selectedSeries.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Course Price:</span>
                <span className="line-through text-slate-400">₹{selectedSeries.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Discount:</span>
                <span className="text-green-600">-₹{selectedSeries.originalPrice - selectedSeries.price}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{selectedSeries.price}</span>
              </div>
            </div>

            <div className="text-sm text-slate-600">
              <p>• Access to {selectedSeries.totalTests} comprehensive tests</p>
              <p>• Detailed explanations and solutions</p>
              <p>• Performance analytics and progress tracking</p>
              <p>• {selectedSeries.duration} of access</p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
