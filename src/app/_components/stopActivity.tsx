"use client";

import useTimerStore from "./../store/CurrentTimer";
const StopActivity = () => {
  const stopActivity = useTimerStore((state) => state.stopActivity);
  return (
    <button
      onClick={() => {
        stopActivity();
      }}
      className="rounded-md bg-red-300 p-2"
    />
  );
};

export default StopActivity;
