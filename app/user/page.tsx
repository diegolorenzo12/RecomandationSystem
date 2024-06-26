"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import { Link } from "@nextui-org/react";

export default function Home() {
  const { data: session } = useSession()

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        {session.user?.image as string && 
            <Image
            src={session.user?.image as string}
            fill
            alt=""
            className="object-cover rounded-full"
            />
        }
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut({ callbackUrl: '/user' })}>Sign out</button>
      </div>
    )
  }

  // rendering components for not logged in users
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Not Signed In</p>
        <Link href="/login">Sign in here</Link>
    </div>
  )

}
