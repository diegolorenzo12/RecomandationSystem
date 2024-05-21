'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Spinner } from '@nextui-org/react'
import axios from 'axios';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';


interface tag{
  idTag: number;
  name: string;
}

interface registerUserTags{
  tags: tag[];
  userId: number; 
}


export default function Survey() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [buttons, setButtons] = useState<tag[]>([]);

  const handleToggle = (index: number) => {
    if (activeIndices.includes(index)) {
        // If the index is already active, remove it from the active indices array
        setActiveIndices(activeIndices.filter(i => i !== index));
    } else {
        // Otherwise, add the index to the active indices array
        setActiveIndices([...activeIndices, index]);
    }
  };
  
  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.hasUserTags) {
        router.push('/recomendations');
      } else {
        router.push('/survey');
      }
    }
    const getTags = async () =>{
      try{
        const request = await axios.get("http://localhost:5107/api/Tags/alltags");
        const data: tag[]= request.data;
        setButtons(data);
      }catch(error){
      }
      
    }
    getTags();
  }, [status, session, router]);

    const handleSubmit = async ()=>{
      if(activeIndices.length>0 || session?.user?.id === undefined){
        const formData = new FormData();

         // Append the userId
        formData.append('userId', session?.user?.id.toString());

        // Append each tagId separately
        activeIndices.forEach(tag => {
          formData.append('tagIds', tag.toString());
        });

        try {
          const response = await axios.post('http://localhost:5107/api/Users/Associate', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(response.status === 200) {
            router.push('/recomendations');
          }
        } catch (error) {
          console.error('Error associating tags with user:', error);
        }
      }
    }

  return (
    <div className='w-full'>
      <h1 className='text-4xl text-center font-bold w-full'>One last step to setup your account</h1>
      {!session? (
        <div className='flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
        ) : (
          <>
            <h1 className='text-xl font-bold w-full mt-2'>Select the topics you want</h1>
            <div className='flex flex-col'>
              <Button className='w-1/3 m-3' color='primary' onPress={handleSubmit}>Continue</Button>
              <div className="flex py-2 flex-wrap">
                {buttons && buttons.map((label, index) => (
                  <Button 
                    radius='sm' 
                    size='lg' 
                    key={index} 
                    color={activeIndices.includes(label.idTag) ? 'secondary' : 'default'}
                    className='m-1 p-8'
                    onClick={() => handleToggle(label.idTag)}
                  >
                    {label.name}
                  </Button>
                ))}
              </div>
            </div>
          </>
      )
      }

    </div>
  )
}