// import Link from "next/link";
import Timer from './_components/Timer'
import Activities from './_components/Activities'
// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

import timerStore from './store/CurrentTimer'
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  return (
    <div className="flex flex-grow h-screen w-full px-4 flex-col items-center justify-center  bg-red-50 ">
      <Timer />
      <Activities />
    </div>
  )
}
