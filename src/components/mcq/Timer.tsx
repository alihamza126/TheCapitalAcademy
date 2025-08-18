"use client"

import React, { useEffect, useState } from "react"

type TimerProps = {
  initialTimeInMinutes: number
  handleSaveAndExit: () => void
}

const Timer = ({ initialTimeInMinutes, handleSaveAndExit }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInMinutes * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSaveAndExit()
    }
  }, [timeRemaining, handleSaveAndExit])

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
    const seconds = timeInSeconds % 60

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0")
    ].join(":")
  }

  return (
    <div className="font-mono text-primary">
      {formatTime(timeRemaining)}
    </div>
  )
}

export default Timer

