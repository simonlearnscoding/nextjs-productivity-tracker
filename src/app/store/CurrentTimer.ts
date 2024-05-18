import { create } from 'zustand';
import type { activityType } from './../_components/activity';
import { activities } from './activities';

export interface TimerState {
  currentActivity: string;
  previousActivity: string;
  startedAt?: Date | null;
  isAnActivityRunning: boolean;
  startActivity: (activity: string) => void;
  stopActivity: () => void;
  activities: activityType[];
}
import type { activeSessionResponse } from '~/types';

const newTimerStore = create<any>((set) => ({
  setFromDBFetch: (activeSession: activeSessionResponse) => setFromDBFetch(set, activeSession),
  activityName: null,
  activityId: null,
  sessionStart: null,
  sessionPartialStart: null,
  sessionPartialType: null,
  sessionTrackingType: null
}))

function setFromDBFetch(set: any, activeSession: activeSessionResponse) {
  if (!activeSession) {
    return;
  }
  set({
    activityName: activeSession.activityName,
    activityId: activeSession.activityId,
    sessionStart: activeSession.sessionStart,
    sessionPartialStart: activeSession.sessionPartialStart,
    sessionPartialType: activeSession.sessionPartialType,
    sessionTrackingType: activeSession.sessionTrackingType,
  })
}

const timerStore = create<TimerState>((set) => ({
  currentActivity: '',
  previousActivity: '',
  isAnActivityRunning: false,
  startActivity: (activity: string) => {
    stopActivity(set);
    set({
      currentActivity: activity,
      startedAt: new Date(),
      isAnActivityRunning: true,
    });
    toggleActivityIsRunningState(activity, true);
  },
  stopActivity: () => stopActivity(set),
  activities: activities,
}));

// Helper functions
function findActivityIndexByTitle(act: string, activities: activityType[]): number {
  return activities.findIndex((a: activityType) => a.title === act);
}

function setPreviousActivityToIsntRunning() {
  const { currentActivity } = timerStore.getState();
  if (currentActivity.length === 0) return;
  toggleActivityIsRunningState(currentActivity, false);
}

function makeNewTimeEntry() {
  addTimeToCurrentActivityObjectInStore();

  function addTimeToCurrentActivityObjectInStore() {
    if (timerIsNotRunning()) {
      return;
    }
    const { currentActivity, startedAt, activities } = timerStore.getState();
    const now = new Date();
    const elapsed = Math.floor((now.getTime() - startedAt!.getTime()) / 1000);
    const activityIndex = findActivityIndexByTitle(currentActivity, activities);
    const updatedActivities: activityType[] = [...activities];
    const newObject: any = {
      ...updatedActivities[activityIndex],
      time: updatedActivities[activityIndex]!.time + elapsed,
    };
    updatedActivities[activityIndex] = newObject;
    timerStore.setState({ activities: updatedActivities });

    function timerIsNotRunning() {
      return !timerStore.getState().isAnActivityRunning;
    }
  }
}

function stopActivity(set: any) {
  makeNewTimeEntry();
  const { currentActivity } = timerStore.getState();
  set({ previousActivity: currentActivity });
  setPreviousActivityToIsntRunning();
  set({ currentActivity: '', isAnActivityRunning: false, startedAt: null });
}

function toggleActivityIsRunningState(activity: string, isRunning: boolean) {
  const { activities } = timerStore.getState();
  const activityIndex = findActivityIndexByTitle(activity, activities);
  if (activityIndex === -1) {
    return;
  }
  const updatedActivities: activityType[] = [...activities];
  const newObject: any = {
    ...updatedActivities[activityIndex],
    isRunning: isRunning,
  };
  updatedActivities[activityIndex] = newObject;
  timerStore.setState({ activities: updatedActivities });
}


export default timerStore;
