'use client'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Link , Divider} from '@nextui-org/react'


export default function SignInLogin() {
    const [emailSignIn, setEmailSignIn] = useState<boolean>(false)

    if(!emailSignIn) {
        return (
            <Card className='w-1/3 bg-dark m-3 p-6  text-white shadow-2xl dark'>
                <CardHeader>
                    <h1 className='text-white text-2xl font-bold'>Sign up</h1>
                </CardHeader>
                <CardBody className='flex justify-center items-center text-white'>
                    <Button
                        color='primary'
                        size='lg'
                        className='w-full my-2'
                        onPress={() => setEmailSignIn(true)}
                    >
                        Continue With Email
                    </Button>
                    <div className='flex flex-row w-full items-center justify-evenly text-green-200'>
                        <Divider orientation="horizontal" className='w-2/5'/>
                        OR
                        <Divider orientation="horizontal" className='w-2/5'/>
                    </div>

                    <Button
                        color='default'
                        size='lg'
                        className='w-full my-2'
                    >
                        Continue with Google
                    </Button>
                </CardBody>
                <CardFooter className='flex items-center justify-center'>
                    <p>Already have an account? <Link href="#"> Log In here</Link></p>
                </CardFooter>
            </Card>
        );
    }

  return  (
    <Card className='w-1/3 bg-dark m-3 p-6  text-white shadow-2xl dark'>
        <CardHeader>
            <h1 className='text-white text-2xl font-bold'>Sign up</h1>
        </CardHeader>
        <CardBody className='flex justify-center items-center text-white'>
            <Input
                type='text'
                label="Email"
                placeholder='Enter you email'
                variant="faded"
                className='my-2'
            />
            <Input
                type='text'
                label="Name"
                placeholder='Enter you Name'
                variant="faded"
                className='my-2'
            />
            <Input
                type='password'
                label="password"
                variant="faded"
                className='my-2'
            />
            <Input
                type='password'
                label="Confirm password"
                variant="faded"
                className='my-2'
            />
            <Button className='w-1/2 my-2 mt-4 bg-lightdark text-white' >Sign up</Button>
        </CardBody>
        <CardFooter className='flex items-center justify-center'>
            <p>Already have an account? <Link href="#"> Log In here</Link></p>
        </CardFooter>
    </Card>
  )
}
