'use client'
import Link from 'next/link'

export default function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

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
