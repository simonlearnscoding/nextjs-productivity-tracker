import create from 'zustand'
import type { activityType } from './../_components/activity'
import { activities } from './activities'
export interface TimerState {
  currentActivity: string
  previousActivity: string
  startedAt?: Date | null
  isAnActivityRunning: boolean
  startActivity: (activity: string) => void
  stopActivity: () => void
  activities: activityType[]
}

const timerStore = create<TimerState>((set) => ({
  currentActivity: '',
  previousActivity: '',
  isAnActivityRunning: false,

  startActivity: (activity: string) => {
    stopActivity(set)
    set({
      currentActivity: activity,
      startedAt: new Date(),
      isAnActivityRunning: true,
    })
    //
    toggleActivityIsRunningState(activity, true)
  },
  stopActivity: () => stopActivity(set),
  activities: activities,
}))

function stopActivity(set: any) {
  makeNewTimeEntry()
  const { currentActivity } = timerStore.getState()
  set({ previousActivity: currentActivity })
  setPreviousActivityToIsntRunning()
  set({ currentActivity: '', isAnActivityRunning: false, startedAt: null })
}

function toggleActivityIsRunningState(activity: string, isRunning: boolean) {
  const { activities } = timerStore.getState()
  const activityIndex = findActivityIndexByTitle(activity, activities)
  if (activityIndex === -1) {
    return
  }
  // Create a copy of the activities array
  const updatedActivities: activityType[] = [...activities]
  // Update the time for the current activity

  const newObject: any = {
    ...updatedActivities[activityIndex],
    isRunning: isRunning,
  }

  updatedActivities[activityIndex] = newObject // Update the state with the new activities array
  timerStore.setState({ activities: updatedActivities })
}

function findActivityIndexByTitle(
  act: string,
  activities: activityType[]
): number {
  return activities.findIndex((a: activityType) => a.title === act)
}

function setPreviousActivityToIsntRunning() {
  const { currentActivity } = timerStore.getState()
  if (currentActivity.length == 0) return
  toggleActivityIsRunningState(currentActivity, false)
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

    // Create a copy of the activities array
    const updatedActivities: activityType[] = [...activities]
    // Update the time for the current activity
    //

    const newObject: any = {
      ...updatedActivities[activityIndex],
      time: updatedActivities[activityIndex]!.time + elapsed,
    }
    updatedActivities[activityIndex] = newObject
    // Update the state with the new activities array
    timerStore.setState({ activities: updatedActivities })

    function timerIsNotRunning() {
      return !timerStore.getState().isAnActivityRunning
    }
  }
}
export default timerStore
