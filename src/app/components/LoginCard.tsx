'use client'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Link , Divider} from '@nextui-org/react'


export default function LoginCard() {
    const [emailLogin, setEmailLogin] = useState<boolean>(false)

    if(!emailLogin) {
        return (
            <Card className='w-1/3 bg-dark m-3 p-6  text-white shadow-2xl dark'>
                <CardHeader>
                    <h1 className='text-white text-2xl font-bold'>Login</h1>
                </CardHeader>
                <CardBody className='flex justify-center items-center text-white'>
                    <Button
                        color='primary'
                        size='lg'
                        className='w-full my-2'
                        onPress={() => setEmailLogin(true)}
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
                    <p>Dont have an account? <Link href="#"> Sign up here</Link></p>
                </CardFooter>
            </Card>
        );
    }

  return  (
    <Card className='w-1/3 bg-dark m-3 p-6  text-white shadow-2xl dark'>
        <CardHeader>
            <h1 className='text-white text-2xl font-bold'>Login</h1>
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
                type='password'
                label="password"
                variant="faded"
                className='my-2'
            />
            <Button className='w-1/2 my-2 mt-4 bg-lightdark text-white' >LogIn</Button>
        </CardBody>
        <CardFooter className='flex items-center justify-center'>
            <p>Dont have an account? <Link href="#"> Sign up here</Link></p>
        </CardFooter>
    </Card>
  )
}
