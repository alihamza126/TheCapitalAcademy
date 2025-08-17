import React from 'react'
import TestSeriesPage from './Series'

const page = () => {
  return (
    <div className='container mx-auto px-4 py-8 mb-10'>
      <div className="text-center my-8">
        {/* Header */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent mb-2">Test Series</h1>
          <p className="text-gray-600">Explore and enroll in comprehensive test series for your preparation</p>
      </div>


      <TestSeriesPage />
    </div>
  )
}

export default page