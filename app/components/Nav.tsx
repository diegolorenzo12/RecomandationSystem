'use client'
import React from 'react'
import { Avatar , Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from '@nextui-org/react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Nav(){
    const { data: session } = useSession()

    if (session) {
        return (
        
            <div className="mb-14">
                <div className="z-20 header fixed top-0 left-0 right-0 h-16 bg-gray-900 flex justify-between items-center px-4 ">
                    <div className="logo pl-8">
                        {/* <img src="/logo.png" alt="Logo" className=" h-10" />  */}
                    </div>
                    <div className="header-container flex justify-end items-center space-x-4 max-w-screen-lg text-14px pr-4 text-white font-termina  font-normal">
                        <Link href="/">Home</Link>
                        <Link href="/create">Create Event</Link>
                        <Link href="/recomendations">Recomendations</Link>
                        {session.user?.image as string ? 
                            
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={session.user?.name}
                                size="sm"
                                src={session.user?.image as string}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{session.user?.email}</p>
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" onPress={() => signOut({ callbackUrl: '/user' })}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        :
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={session.user?.name}
                                size="sm"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{session.user?.email}</p>
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger" onPress={() => signOut({ callbackUrl: '/user' })}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        
        <div className="mb-14">
            <div className="z-20 header fixed top-0 left-0 right-0 h-16 bg-gray-900 flex justify-between items-center px-4 ">
                <div className="logo pl-8">
                    {/* <img src="/logo.png" alt="Logo" className=" h-10" />  */}
                </div>
                <div className="header-container flex justify-end items-center space-x-4 max-w-screen-lg text-14px pr-4 text-white font-termina  font-normal">
                    <Link href="/">Home</Link>
                    <Link href="/login">Recomendations</Link>
                </div>
            </div>
        </div>
    )
}