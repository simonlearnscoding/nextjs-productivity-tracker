// import Link from "next/link";
import Timer from './_components/Timer'
import Activities from './_components/Activities'
// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";

import timerStore from './store/CurrentTimer'
export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  return (
    <div className="flex grow-1">
      <div className=" w-0 md:w-full md:py-20 md:px-6">
        <div className="w-full h-full bg-gray-100 rounded-md"> </div>
      </div>

      <div className="flex flex-grow h-screen w-full px-4 flex-col items-center justify-center   ">
        <Timer />
        <Activities />
      </div>
    </div>
  )
}
