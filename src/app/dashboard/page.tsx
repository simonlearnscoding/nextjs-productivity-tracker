// import Link from "next/link";
'use client'
import Timer from './../_components/Timer'
import Activities from './../_components/Activities'
// import { CreatePost } from "~/app/_components/create-post";
// import { api } from "~/trpc/server";
import UserHeader from './../_components/UserHeader'

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // <div className=" w-full   h-full  bg-stone-400 rounded-md md:px-6"></div>
  return (
    <div className=" h-screen w-screen bg-slate-800 overflow-hidden">
      <UserHeader />
      <div className="flex     items-start w-full h-full justify-start   sm:px-8 px-4 gap-8 grow-1 md:pt-16">
        <div className="bg-slate-900 rounded-md h-5/6 hidden md:flex w-full ">
          {' '}
        </div>
        <div className="flex h-5/6   w-full   flex-col items-start justify-start   ">
          <Timer />
          <Activities />
        </div>
      </div>
    </div>
  )
}
