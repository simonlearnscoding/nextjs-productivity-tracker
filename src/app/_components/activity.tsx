"use client";
import timerStore from "./../store/CurrentTimer";

type activity = {
  title: string;
  color: string;
};

export default function Activity({ act }: { act: activity }) {
  const startActivity = timerStore((state) => state.startActivity);
  const handleClick = () => {
    startActivity(act.title);
  };

  return (
    <div
      onClick={handleClick}
      className="transition:all flex w-60 cursor-pointer justify-center rounded-xl border-2 py-4 text-2xl font-semibold transition-all hover:bg-gray-300 "
    >
      {act.title}
    </div>
  );
}
