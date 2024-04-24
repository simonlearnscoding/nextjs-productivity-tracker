'use client'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { useUser } from '@clerk/clerk-react'
const UserHeader = () => {
  const user = useUser()
  return (
    <header className="bg-rose-950 w-full h-16 flex justify-center items-center px-4">
      <div className="text-white text-2xl font-semibold ml-6">
        {' '}
        Welcome {user.user?.fullName}{' '}
      </div>

      <div className="ml-auto mr-6">
        <UserButton />
      </div>
    </header>
  )
}

export default UserHeader
