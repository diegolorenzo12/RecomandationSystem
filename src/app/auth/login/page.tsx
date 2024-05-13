import React from 'react'
import LoginCard from '@/app/components/LoginCard'
import SignInLogin from '@/app/components/SignInCard'

export default function Login() {
  return (
    <main className='flex flex-col justify-center items-center'>
        <LoginCard></LoginCard>
        <SignInLogin></SignInLogin>
    </main>
  )
}
