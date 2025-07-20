"use client"

import { useState, useEffect } from "react"

interface TimerProps {
  initialTimeInMinutes: number
  handleSaveAndExit: () => void
}

const Timer = ({ initialTimeInMinutes, handleSaveAndExit }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInMinutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSaveAndExit()
    }
  }, [timeRemaining, handleSaveAndExit])

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return <div>{formatTime(timeRemaining)}</div>
}

export default Timer
