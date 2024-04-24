'use client'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { useUser } from '@clerk/clerk-react'
const UserHeader = () => {
  const user = useUser()
  return (
    <header className="  w-full hidden  h-16 sm:flex justify-center items-center px-4">
      <div className="text-white sm:text-2xl text-xl font-semibold ">
        {' '}
        {user.user?.firstName}{' '}
      </div>

      <div className="ml-auto ">
        <UserButton />
      </div>
    </header>
  )
}

export default UserHeader
