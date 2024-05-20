'use client'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Link , Divider} from '@nextui-org/react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignInLogin() {
    const [emailSignIn, setEmailSignIn] = useState<boolean>(false)
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleRegister = async () => {
        if (password !== confirmPassword) {
            return
        }
        if(username === '' || password === '' || email === '') {
            return;
        }
        const formData = new FormData();
        formData.append('user', username);
        formData.append('email', email);
        formData.append('password', password);
        const response = await axios.post('http://localhost:19537/api/Users/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            router.push('/login');
        }else{
            console.error('Register failed');
        }
    }

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
                        onPress={() => signIn("github")}
                    >
                        Continue with Github
                    </Button>
                </CardBody>
                <CardFooter className='flex items-center justify-center'>
                    <p>Already have an account? <Link href="/login"> Log In here</Link></p>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type='text'
                label="Username"
                placeholder='Enter you username'
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
            <Input
                type='password'
                label="Confirm password"
                variant="faded"
                className='my-2'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}

            />
            <Button className='w-1/2 my-2 mt-4 bg-lightdark text-white' onPress={handleRegister}>Sign up</Button>
        </CardBody>
        <CardFooter className='flex items-center justify-center'>
            <p>Already have an account? <Link href="/login"> Log In here</Link></p>
        </CardFooter>
    </Card>
  )
}
