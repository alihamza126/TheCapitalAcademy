'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Typography } from '@mui/material'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'
import Axios from '@/lib/Axios'

const CourseDetails = () => {
  const [rowData, setRowData] = useState([])

  const user = "";
  const isMdcat = user?.isMdcat || false
  const isNums = user?.isNums || false
  const isMdcatNums = user?.isMdcatNums || false
  const isTrial = user?.isTrialActive || false

  const getCourseStatus = () => {
    if (isMdcat && isNums) return 'Mdcat & Nums Course Active'
    if (isMdcat) return 'Mdcat Course Active'
    if (isNums) return 'Nums Course Active'
    if (isMdcatNums) return 'Mdcat & Nums Course Active'
    if (isTrial && !isMdcat && !isNums && !isMdcatNums) return 'Free Trial Active'
    return 'No Active Course'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get('/purchase/dashboard')
        const currentDate = new Date()
        const newData = res.data.map((e) => {
          const purchaseDate = new Date(e.purchaseDate)
          const expiryDate = new Date(e.expiryDate)
          const remainingDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24))
          return {
            Course: e.course,
            price: 'PKR ' + Math.floor(e.price).toLocaleString(),
            Status: e.status,
            Purchase_Date: purchaseDate.toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' }),
            Remaining_Days: remainingDays + ' days'
          }
        })
        setRowData(newData)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-full mx-auto px-4 py-10 space-y-6">
      <Card className="shadow border bg-white">
        <CardContent className="py-6 text-center">
          <Typography variant="h4" className="text-primary font-bold">
            Course Details
          </Typography>
        </CardContent>
      </Card>
      <Card className="shadow border bg-white">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-sm font-semibold text-gray-700">Course</TableHead>
                <TableHead className="text-sm font-semibold text-gray-700">Price</TableHead>
                <TableHead className="text-sm font-semibold text-gray-700">Status</TableHead>
                <TableHead className="text-sm font-semibold text-gray-700">Purchase Date</TableHead>
                <TableHead className="text-sm font-semibold text-gray-700">Remaining Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowData.length > 0 ? (
                rowData.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-sm text-gray-800">{row.Course}</TableCell>
                    <TableCell className="text-sm text-gray-800">{row.price}</TableCell>
                    <TableCell className="text-sm text-gray-800">{row.Status}</TableCell>
                    <TableCell className="text-sm text-gray-800">{row.Purchase_Date}</TableCell>
                    <TableCell className="text-sm text-gray-800">{row.Remaining_Days}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-gray-500 py-6">
                    No course data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CourseDetails
