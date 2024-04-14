import create, { State } from "zustand";

export interface TimerState {
  currentActivity: string;
  startedAt?: Date | null;
  isRunning: boolean;
  startActivity: (activity: string) => void;
  stopActivity: () => void;
}

const timerStore = create<TimerState>((set) => ({
  currentActivity: "no activity selected",
  isRunning: false,
  startActivity: (activity: string) => {
    makeEntry();
    set({ currentActivity: activity, startedAt: new Date(), isRunning: true });
  },
  stopActivity: () => {
    makeEntry();
    set({ currentActivity: "", isRunning: false, startedAt: null });
  },
}));

function makeEntry() {
  if (!timerStore.getState().isRunning) {
    return;
  }
  const { currentActivity, startedAt } = timerStore.getState();
  const now = new Date();
  const elapsed = now.getTime() - startedAt!.getTime();
  console.log(`${currentActivity} - ${elapsed}ms`);
}

export default timerStore;
