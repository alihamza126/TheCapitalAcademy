'use client'

import React, { useEffect, useState } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Button, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { enqueueSnackbar, closeSnackbar } from 'notistack'

const CourseDetails = () => {
  const [mcqs, setMcqs] = useState([])
  const alphabets = ['A', 'B', 'C', 'D']

  const config = {
    loader: { load: ['[tex]/ams'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
  }

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 4000,
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      action: (
        <IconButton size="small" color="inherit" onClick={() => closeSnackbar()}>
          <Close fontSize="small" />
        </IconButton>
      )
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/mcq/bookmarks')
        if (res.data) setMcqs(res.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  const handleUnbookmark = async (mcqId) => {
    try {
      await axiosInstance.put('/mcq/unbookmark', { mcqId })
      setMcqs(prev => prev.filter(mcq => mcq._id !== mcqId))
      showSnackbar('Removed from bookmarks.', 'info')
    } catch (error) {
      showSnackbar('Failed to unbookmark.', 'error')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="sticky top-0 z-30 bg-white shadow rounded-xl px-6 py-4 mb-8">
        <Typography variant="h4" className="text-indigo-600 font-bold text-center">
          Bookmarked MCQs
        </Typography>
      </div>

      <MathJaxContext version={3} config={config}>
        <div className="space-y-6">
          {mcqs.length > 0 ? (
            mcqs.map((mcq, i) => (
              <div key={mcq._id} className="bg-white rounded-xl shadow px-6 py-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-gray-800 font-semibold">
                    Q{i + 1}) <MathJax inline>{mcq.question}</MathJax>
                  </div>
                  <IconButton onClick={() => handleUnbookmark(mcq._id)} title="Remove from bookmarks">
                    <i className="fas fa-bookmark text-red-500 text-xl"></i>
                  </IconButton>
                </div>

                <div className="space-y-2 pl-3">
                  {mcq.options.map((opt, index) => {
                    const isCorrect = mcq.correctOption === index + 1
                    return (
                      <div key={index} className="flex gap-2 items-start">
                        <div
                          className={`rounded-full px-2 py-1 text-xs font-bold ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          ({alphabets[index]})
                        </div>
                        <div className="text-gray-800">
                          <MathJax inline>{opt}</MathJax>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-indigo-600 mb-1">Explanation:</p>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    <MathJax inline>{mcq.explain}</MathJax>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 48 48">
                <path fill="#eb6773" d="M37,6c0-1.105-0.895-2-2-2H13c-1.105,0-2,0.895-2,2v4h26V6z" />
                <path fill="#b31523" d="M11,41.72c0,0.996,1.092,1.606,1.94,1.084L24,35.998l11.06,6.806C35.908,43.326,37,42.716,37,41.72V30H11V41.72z" />
                <rect width="26" height="12" x="11" y="18" fill="#cf1928" />
                <rect width="26" height="8" x="11" y="10" fill="#d9414f" />
                <circle cx="38" cy="24" r="10" fill="#21ad64" />
                <path fill="#fff" d="M38.5,29h-1c-.276,0-.5-.224-.5-.5v-9c0-.276.224-.5.5-.5h1c.276,0,.5.224,.5.5v9C39,28.776,38.776,29,38.5,29z" />
                <path fill="#fff" d="M33,24.5v-1c0-.276.224-.5.5-.5h9c.276,0,.5.224,.5.5v1c0,.276-.224.5-.5.5h-9C33.224,25,33,24.776,33,24.5z" />
              </svg>
              <p className="mt-4 text-lg font-semibold text-gray-700">No MCQs bookmarked yet!</p>
            </div>
          )}
        </div>
      </MathJaxContext>
    </div>
  )
}

export default CourseDetails
