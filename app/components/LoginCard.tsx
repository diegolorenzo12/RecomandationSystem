'use client'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Link , Divider} from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginCard() {
    const [emailLogin, setEmailLogin] = useState<boolean>(false)
    const { data: session } = useSession();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });
        if (result?.ok) {
            router.push('/recomendations');
        } else {
            // Handle login failure (e.g., show an error message)
            console.error('Login failed');
        }
      };

    const handleThirdPartyLogin = async (provider: string) => {
        signIn(provider); // No need for redirect: false here, as NextAuth will handle redirection
    };


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
                        onPress={() => signIn("github")}
                    >
                        Continue with Github
                    </Button>
                </CardBody>
                <CardFooter className='flex items-center justify-center'>
                    <p>Dont have an account? <Link href="/register"> Sign up here</Link></p>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type='password'
                label="password"
                variant="faded"
                className='my-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className='w-1/2 my-2 mt-4 bg-lightdark text-white'onPress={handleLogin} >LogIn</Button>
        </CardBody>
        <CardFooter className='flex items-center justify-center'>
            <p>Dont have an account? <Link href="/register"> Sign up here</Link></p>
        </CardFooter>
    </Card>
  )
}
