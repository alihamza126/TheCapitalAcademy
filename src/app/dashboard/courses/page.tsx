import MyCourses from '@/components/dashboard/MyCourses'
import Axios from '@/lib/Axios';
import React from 'react'



const page = async () => {
  let activeCourses = null;
  try {
    const res = await Axios.get('/api/v1/course/active-courses');
    activeCourses = res?.data?.activeCourses;
    console.log(activeCourses)
    if (!activeCourses) {
      return (
        <>
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>No Active Courses</h1>
            <p className='text-gray-600 mt-2'>You have not enrolled in any courses yet.</p>
          </div>
        </>
      )
    }
  } catch (error) {
    console.log(error)
  }



  return (
    <>
      <MyCourses activeCourses={['mdcat', 'nums', 'mdcatNums', 'trial']} />
    </>
  )
}

export default page