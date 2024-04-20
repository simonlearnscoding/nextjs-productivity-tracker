'use client'
import PlayIcon from './PlayIcon'
import { useEffect, useState } from 'react'
import timerStore from './../store/CurrentTimer'
import { useRecalculateTimePassed } from '../hooks/useRecalculateTime'
// import { useRecalculateTimePassed } from './timer'

// LATER: Play on no activity should just restart the last one
const Timer = () => {
  const currentActivity = timerStore((state) => state.currentActivity)
  const stopActivity = timerStore((state) => state.stopActivity)
  const startedAt = timerStore((state) => state.startedAt)
  // const hours = startedAt?.getHours().toString().padStart(2, '0') // Ensure two digits
  // const minutes = startedAt?.getMinutes().toString().padStart(2, '0') // Ensure two digits
  const timePassed = useRecalculateTimePassed(startedAt, currentActivity)
  const currentlyTracking = () => currentActivity != ''

  const onClick = () => {
    stopActivity()
  }
  return (
    <div className="bg-gray-100 w-full mb-3 flex flex-col rounded-md px-1 py-2">
      <div className="bg-gray-200 rounded-md px-3 py-2 text-2xl w-full mb-2">
        {currentlyTracking() ? currentActivity : 'No activity'}
      </div>
      <div className="flex py-4  px-3 bg-gray-200  items-center rounded-md">
        <div className="   text-2xl w-full ">
          {currentlyTracking() ? timePassed : ''}
        </div>
        <PlayIcon
          size={'6'}
          isPlay={currentlyTracking() ? false : true}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export default Timer
