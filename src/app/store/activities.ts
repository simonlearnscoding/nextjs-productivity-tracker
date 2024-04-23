'use client'
import type { activityType } from './../_components/activity'
export const activities: activityType[] = [
  {
    title: 'Workout',
    color: 'cyan',
    didIt: [false, true, false, true, false, true, false],
    time: 0,
    isRunning: false,
  },
  {
    title: 'Study',
    color: 'amber',
    didIt: [false, true, false, true, false, true, false],
    time: 0,
    isRunning: false,
  },

  {
    title: 'Read',
    color: 'border-orange-600',
    didIt: [false, true, false, true, false, true, false],
    time: 0,
    isRunning: false,
  },
  {
    title: 'Meditate',
    color: 'border-blue-600',
    didIt: [false, true, false, true, false, true, false],
    time: 0,
    isRunning: false,
  },
  {
    title: 'Cook',
    color: 'border-pink-600',
    didIt: [false, true, false, true, false, true, false],
    time: 0,
    isRunning: false,
  },
]
