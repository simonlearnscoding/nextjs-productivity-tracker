'use client'
import React from 'react'
import Activity from './activity'
import useTimerStore from './../store/CurrentTimer'
const Activities = () => {
  const activities = useTimerStore((state) => state.activities)
  return (
    <>
      {activities.map((act) => (
        <Activity act={act} key={act.title} />
      ))}
    </>
  )
}

export default Activities
