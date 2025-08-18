import React from 'react'
import TestSeriesPage from './Series'
import Axios from '@/lib/Axios';

const page = async () => {
  let data = [];
  const res = await Axios.get('/api/v1/series');
  console.log("series data is here",res.data)
  if (res.data) {
    data = res.data.data
  }



  return (
    <div className='container mx-auto px-4 py-8 mb-10'>
      <div className="text-center my-8">
        {/* Header */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent mb-2">Test Series</h1>
        <p className="text-gray-600">Explore and enroll in comprehensive test series for your preparation</p>
      </div>


      <TestSeriesPage data={data} />
    </div>
  )
}

export default page