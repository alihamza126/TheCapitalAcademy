'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody, Spinner } from '@heroui/react'
import SubjectBreakdown from './subject-breakdown'
import PerformanceCharts from './performance-charts'
import ProgressSpeedometer from './progress-speedometer'
import StatsOverview from './stats-overview'
import Axios from '@/lib/Axios'


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
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Spinner variant="wave" size="lg" className="text-blue-600 mb-4" />
          <p className="text-gray-600">Loading your stats...</p>
        </div>
      </div>
    )
  }

  if (!statsData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent mb-2">Learning Progress Dashboard</h1>
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
