// import Link from "next/link";
import useTimerStore from "./store/CurrentTimer";
import StopActivity from "./_components/stopActivity";
import Timer from "./_components/timer";
import Activity from "./_components/activity";
// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

const activity = [
  {
    title: "Workout",
    color: "red-300",
  },
  {
    title: "Study",
    color: "red-300",
  },

  {
    title: "Read",
    color: "red-300",
  },
  {
    title: "Meditate",
    color: "red-300",
  },
  {
    title: "Cook",
    color: "red-300",
  },
];
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-red-50 ">
      <Timer />
      {activity.map((act) => (
        <Activity act={act} />
      ))}
      <StopActivity />
    </div>
  );
}
