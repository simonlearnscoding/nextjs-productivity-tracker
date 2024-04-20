import create, { State } from 'zustand'
import { activities } from './activities'

type activity = {
  title: string
  color: string
  isRunning: boolean
  didIt: boolean[]
  time: number
}
export interface TimerState {
  currentActivity: string
  startedAt?: Date | null
  isAnActivityRunning: boolean
  startActivity: (activity: string) => void
  stopActivity: () => void
  activities: activity[]
}

const timerStore = create<TimerState>((set) => ({
  currentActivity: '',
  isAnActivityRunning: false,

  startActivity: (activity: string) => {
    makeNewTimeEntry()
    setPreviousActivityToIsntRunning()
    set({
      currentActivity: activity,
      startedAt: new Date(),
      isAnActivityRunning: true,
    })
    //
    toggleActivityIsRunningState(activity, true)
  },
  stopActivity: () => {
    setPreviousActivityToIsntRunning()
    makeNewTimeEntry()
    set({ currentActivity: '', isAnActivityRunning: false, startedAt: null })
  },
  activities: activities,
}))

function toggleActivityIsRunningState(activity: string, isRunning: boolean) {
  const { activities } = timerStore.getState()
  const activityIndex = findActivityIndexByTitle(activity, activities)
  if (activityIndex === -1) {
    return
  }
  // Create a copy of the activities array
  const updatedActivities: activity[] = [...activities]
  // Update the time for the current activity
  updatedActivities[activityIndex] = {
    ...updatedActivities[activityIndex],
    isRunning: isRunning,
  }
  // Update the state with the new activities array
  timerStore.setState({ activities: updatedActivities })
}

function findActivityIndexByTitle(act: string, activities: activity[]): number {
  return activities.findIndex((a: activity) => a.title === act)
}

function setPreviousActivityToIsntRunning() {
  const { currentActivity } = timerStore.getState()
  if (currentActivity.length > 0) {
    toggleActivityIsRunningState(currentActivity, false)
  }
}
function makeNewTimeEntry() {
  addTimeToCurrentActivityObjectInStore()

  function addTimeToCurrentActivityObjectInStore() {
    if (timerIsNotRunning()) {
      return
    }
    const { currentActivity, startedAt, activities } = timerStore.getState()
    const now = new Date()
    const elapsed = Math.floor((now.getTime() - startedAt!.getTime()) / 1000)
    // Find the index of the current activity in the activities array
    const activityIndex = findActivityIndexByTitle(currentActivity, activities)
    if (activityIndex === -1) {
      return
    }
    // Create a copy of the activities array
    const updatedActivities = [...activities]
    // Update the time for the current activity
    updatedActivities[activityIndex] = {
      ...updatedActivities[activityIndex],
      time: updatedActivities[activityIndex].time + elapsed,
    }
    // Update the state with the new activities array
    timerStore.setState({ activities: updatedActivities })

    function timerIsNotRunning() {
      return !timerStore.getState().isAnActivityRunning
    }
  }
}
export default timerStore
