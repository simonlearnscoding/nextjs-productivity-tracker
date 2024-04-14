"use client";
import { useEffect, useState } from "react";
import timerStore from "./../store/CurrentTimer";
const Timer = () => {
  const currentActivity = timerStore((state) => state.currentActivity);
  const startedAt = timerStore((state) => state.startedAt);

  const hours = startedAt?.getHours().toString().padStart(2, "0"); // Ensure two digits
  const minutes = startedAt?.getMinutes().toString().padStart(2, "0"); // Ensure two digits

  const timePassed = useRecalculateTimePassed(startedAt, currentActivity);
  return (
    <div className=" text-2xl">
      Currently: {currentActivity} -{" "}
      {startedAt && `Since: ${hours}:${minutes} - ${timePassed}`}
    </div>
  );
};
export default Timer;

function useRecalculateTimePassed(
  time: Date | undefined,
  currentActivity: string,
): string {
  const [timePassed, setTimePassed] = useState<string>("00:00");

  useEffect(() => {
    if (!time) {
      setTimePassed("");
      return;
    }
    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - time.getTime();
      const minutes = formatTime(Math.floor(diff / 60000)); // Format minutes
      const seconds = formatTime(Math.floor((diff % 60000) / 1000)); // Format seconds
      setTimePassed(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, currentActivity]);
  return timePassed;
}

// Function to format time with leading zero if necessary
function formatTime(time: number): string {
  return time.toString().padStart(2, "0");
}
