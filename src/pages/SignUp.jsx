import React from 'react'
import { SignUp } from '@clerk/clerk-react' // Signup component from Clerk

export default function Register() {
  return (
    <div className='items-center justify-center flex'><SignUp appearance={{
      elements: {
        formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
      },
    }} /></div>
  )
}
