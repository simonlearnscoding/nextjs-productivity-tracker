import { useEffect, useState } from 'react'
export function useRecalculateTimePassed(
  time: Date | null | undefined,
  currentActivity: string
): string {
  const [timePassed, setTimePassed] = useState<string>('00:00')

  useEffect(() => {
    setTimePassed('00:00')
    if (!time) {
      return
    }
    const interval = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - time.getTime()
      const minutes = formatTime(Math.floor(diff / 60000)) // Format minutes
      const seconds = formatTime(Math.floor((diff % 60000) / 1000)) // Format seconds
      setTimePassed(`${minutes}:${seconds}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [time, currentActivity])
  return timePassed
}

// Function to format time with leading zero if necessary
function formatTime(time: number): string {
  return time.toString().padStart(2, '0')
}
