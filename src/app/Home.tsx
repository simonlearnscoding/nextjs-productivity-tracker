import Timer from "./_components/timer";
import Activity from "./_components/activity";
import { activity } from "./page";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 bg-red-50 ">
      <Timer />
      {activity.map((act) => (
        <Activity act={act} />
      ))}
    </div>
  );
}
