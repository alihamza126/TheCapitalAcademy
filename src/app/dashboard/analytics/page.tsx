'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody } from '@heroui/react'
import SubjectBreakdown from './subject-breakdown'
import PerformanceCharts from './performance-charts'
import ProgressSpeedometer from './progress-speedometer'
import StatsOverview from './stats-overview'
import Axios from '@/lib/Axios'

// Mock data based on your API response
const mockStatsData = {
  totalSolved: 30,
  totalWrong: 12,
  totalSave: 4,
  lastSaveAt: "2025-07-20T12:00:00Z",
  subjects: [
    {
      subject: "Physics",
      solved: 10,
      wrong: 4
    },
    {
      subject: "Math",
      solved: 20,
      wrong: 8
    }
  ]
}

export default function StatsPage() {
  const [statsData, setStatsData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      try {
        // Replace with your actual API call
        const response = await Axios.get('/api/v1/mcq/stats')
        const data = response.data;
        setStatsData(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your stats...</p>
        </div>
      </div>
    )
  }

  if (!statsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardBody className="text-center">
            <p className="text-gray-600">No stats data available</p>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen md:p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Learning Progress Dashboard</h1>
          <p className="text-gray-600">Track your performance and achievements</p>
        </div>

        {/* Overview Cards */}
        <StatsOverview data={statsData} />

        {/* Speedometer and Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressSpeedometer data={statsData} />
          <PerformanceCharts data={statsData} />
        </div>

        {/* Subject Breakdown */}
        <SubjectBreakdown data={statsData} />
      </div>
    </div>
  )
}
