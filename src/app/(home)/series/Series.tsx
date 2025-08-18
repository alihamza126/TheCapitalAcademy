"use client"

import { useState } from "react"
import { Card, Row, Col, Tag, Input, Select, Modal, message } from "antd"
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
import Button from "@/shared/Button/Button"
import { redirect, useRouter } from "next/navigation"

const { Search } = Input



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

export default function TestSeriesPage({ data }) {
  const [searchText, setSearchText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [enrollModalVisible, setEnrollModalVisible] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState<any>(null)
  const [loading, setLoading] = useState(false);
  const router=useRouter()



  const handleEnroll = (series: any) => {
    setSelectedSeries(series)
    setEnrollModalVisible(true)
  }

  const confirmEnrollment = () => {
    console.log("selected", selectedSeries)
    message.success(`Redriecting to checkout !`)
    setLoading(true)
    return router.push(`/checkout?type=series&id=${selectedSeries._id}&price=${selectedSeries.price}`)
    // setEnrollModalVisible(false)
    setSelectedSeries(null)
  }

  const filteredSeries = data.filter((series) => {
    const matchesSearch =
      series.title.toLowerCase().includes(searchText.toLowerCase()) ||
      series.description.toLowerCase().includes(searchText.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "enrolled" && series.enrolled) ||
      (selectedFilter === "available" && !series.enrolled)

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
                  className="shadow-lg border-0 rounded-xl h-full overflow-hidden"
                  cover={
                    <div className="relative">
                      <img
                        alt={series.title}
                        src={series.coverImageUrl || "/placeholder.svg"}
                        className="h-56 w-full object-fit"
                      />
                      {series.enrolled && (
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
                      <h3 className="text-lg font-bold text-primary-400 capitalize mb-1">{series.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2 min-h-10">{series.description}</p>
                    </div>

                    {/* Subjects */}
                    <div className="flex flex-wrap gap-1">
                      {series.subjects.map((subject) => (
                        <Tag key={subject} color={subjectColors[subject as keyof typeof subjectColors]} size="small">
                          {subject}
                        </Tag>
                      ))}
                    </div>



                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <BookOutlined />
                        <span>{series.totalTests} Tests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockCircleOutlined />
                        <span>{series.totalDurationMin} Mintues</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-primary">Pkr {series.price}</span>
                          <span className="text-sm text-slate-400 line-through">Pkr {series.originalPrice}</span>
                        </div>
                        <div className="text-xs text-green-600">Save Pkr {series.originalPrice - series.price}</div>
                      </div>

                      {series.enrolled ? (
                        <Button

                          icon={<PlayCircleOutlined />}
                          className="bg-gradient-to-r from-secondary-400  text-white to-teal-500 border-none"
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button

                          onClick={() => handleEnroll(series)}
                          className="bg-gradient-to-r from-primary-400 to-pink border-none text-white"
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
        loading={loading}
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
                <span className="line-through text-slate-400">Pkr{selectedSeries.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Discount:</span>
                <span className="text-green-600">-Pkr{selectedSeries.originalPrice - selectedSeries.price}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-green-600">Pkr{selectedSeries.price}</span>
              </div>
            </div>

            <div className="text-sm text-slate-600">
              <p>• Access to {selectedSeries.totalTests} comprehensive tests</p>
              <p>• Performance analytics and progress tracking</p>
              <p>• {selectedSeries.duration} of access</p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
