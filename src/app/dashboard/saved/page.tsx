'use client'

import React, { useEffect, useState } from 'react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { enqueueSnackbar, closeSnackbar } from 'notistack'
import Axios from '@/lib/Axios'
import { Accordion, AccordionItem, Button } from '@heroui/react'
import { Bookmark } from 'lucide-react'
import { FlaskConical, Atom, BookText, Brain, Languages } from "lucide-react";

const CourseDetails = () => {
  const [mcqs, setMcqs] = useState([])
  const alphabets = ['A', 'B', 'C', 'D']
  const [selectedSubject, setSelectedSubject] = useState(null)
  const uniqueSubjects = [...new Set(mcqs.map((q) => q.subject))]


  const subjectIcons = {
    biology: <FlaskConical className="w-4 h-4" />,
    chemistry: <Atom className="w-4 h-4" />,
    physics: <Atom className="w-4 h-4" />,
    english: <Languages className="w-4 h-4" />,
    logic: <Brain className="w-4 h-4" />,
  };

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
        const res = await Axios.get('/api/v1/mcq/bookmarks')
        if (res.data) setMcqs(res.data)
        console.log(res.data)
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  const handleUnbookmark = async (mcqId) => {
    try {
      await Axios.put('/api/v1/mcq/unbookmark', { mcqId })
      setMcqs(prev => prev.filter(mcq => mcq._id !== mcqId))
      showSnackbar('Removed from bookmarks.', 'info')
    } catch (error) {
      showSnackbar('Failed to unbookmark.', 'error')
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="sticky top-0 z-30 bg-white shadow rounded-xl px-6 py-4 mb-8">
        <Typography fontWeight="semibold" variant="h4" className="bg-gradient-to-r from-blue-600 via-purple  to-pink bg-clip-text text-transparent font-bold text-center">
          Bookmarked MCQs
        </Typography>
      </div>
      {uniqueSubjects.length > 0 && (
        <div className="mb-8 flex gap-3 md:px-4 ">
          <h3 className="text-lg font-semibold text-gray-700">Filter by Subject</h3>
          <div className="flex flex-wrap gap-3">
            {uniqueSubjects.map((subj) => {
              const isSelected = selectedSubject === subj;
              return (
                <Button
                  key={subj}
                  startContent={
                    <span className="flex items-center gap-2 capitalize">
                      {subjectIcons[subj]} {subj}
                    </span>
                  }
                  size="sm"
                  radius="lg"
                  variant={isSelected ? "solid" : "faded"}
                  color={isSelected ? "primary" : "default"}
                  onPress={() =>
                    setSelectedSubject((prev) => (prev === subj ? null : subj))
                  }
                  className={`transition-all duration-200 shadow-sm ${isSelected
                    ? "font-semibold text-white"
                    : "text-gray-800 hover:bg-gray-100"
                    }`}
                >
                  {subj}
                </Button>
              );
            })}
          </div>
        </div>
      )}




      <MathJaxContext version={3} config={config}>
        <div className="space-y-6">
          {(selectedSubject ? mcqs.filter(mcq => mcq.subject === selectedSubject) : mcqs).length > 0 ? (
            <Accordion variant="splitted">
              {(selectedSubject ? mcqs.filter(mcq => mcq.subject === selectedSubject) : mcqs).map((mcq, i) => (
                <AccordionItem
                  key={mcq._id}
                  title={<div className="text-gray-800 font-semibold">
                    Q{i + 1}) <MathJax inline>{mcq.question}</MathJax>
                  </div>}
                  aria-label={`Question ${i + 1}`}
                  className="bg-white rounded-xl shadow"
                >
                  <div className="px-4 py-2 space-y-3">
                    <div className="flex justify-between items-start">
                      <div></div>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        isIconOnly
                        onPress={() => handleUnbookmark(mcq._id)}
                        title="Remove from bookmarks"
                      >
                        <Bookmark className="text-red text-xl" />
                      </Button>
                    </div>

                    <div className="space-y-2 pl-3">
                      {mcq.options.map((opt, index) => {
                        const isCorrect = mcq.correctOption === index + 1
                        return (
                          <div key={index} className="flex gap-2 items-start">
                            <div
                              className={`rounded-full px-2 py-1 text-xs font-bold ${isCorrect
                                ? 'bg-lime-400 text-white'
                                : 'bg-gray-200 text-gray-700'
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

                    <div>
                      <p className="text-sm font-semibold text-secondary-600 mb-1">Explanation:</p>
                      <div className="text-gray-700 whitespace-pre-wrap">
                        <MathJax inline>{mcq.explain}</MathJax>
                      </div>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
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
