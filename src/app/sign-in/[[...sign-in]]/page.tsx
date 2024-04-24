import { SignIn } from '@clerk/nextjs'

const SignUpPage = () => (
  <div className="w-screen h-screen bg-gray-700 flex justify-center items-center">
    <SignIn />
  </div>
)

export default SignUpPage
