// 'use client'
import { api } from '~/trpc/server'
import Link from 'next/link'

const Activities = [
  'Workout',
  'Study',
  'Work',
  'Meditation',
  'Reading',
  'Writing',
]

function createAllActivities() {
  Activities.map((activity) => {
    api.post.createActivity({ name: activity })
  })
}

export default function Home() {
  return (
    <div className="bg-gray-700 h-screen flex-col w-screen flex justify-center items-center">
      <div className="flex text-5xl text-gray-100 font-semibold grow-1">
        Welcome To My Study Bot
      </div>
      <Link href="/dashboard">
        <div className="bg-gray-950 text-gray-50 px-8 py-4 rounded-md text-xl font-bold mt-28 ">
          Dashboard
        </div>
      </Link>
    </div>
  )
}
