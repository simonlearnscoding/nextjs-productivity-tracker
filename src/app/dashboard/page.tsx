// 'use client'
import Timer from './../_components/Timer'
// import { useEffect } from 'react'
import Activities from './../_components/Activities'
// import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import UserHeader from './../_components/UserHeader'

export default function Home() {
  const user = useUser()

  if (user.user == null) {
    return <div>loading...</div>
  }
  api.session.startSession(
    {
      userId: user.user.id,
      activityId: 1,
    }

  )
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
