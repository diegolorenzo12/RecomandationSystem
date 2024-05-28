'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Spinner, ScrollShadow , Autocomplete, AutocompleteSection, AutocompleteItem } from '@nextui-org/react'
import axios from 'axios';
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import {useAsyncList} from "@react-stately/data";



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
  const [tags, setTags] = useState<tag[]>([]);
  const [value, setValue] = React.useState<React.Key>("");


  let list = useAsyncList<Tag>({
    async load({signal, filterText}) {
        try {
            let res = await fetch(`http://localhost:5107/api/Tags/paginated?name=${filterText}`, { signal });
            let json = await res.json();
    
            // Ensure the response has a results array
            if (!Array.isArray(json.results)) {
              throw new Error('Invalid response structure');
            }
    
            return {
              items: json.results,
            };
        } catch (error) {
            console.error("Failed to load tags", error);
            return { items: [] };
        }
    },
  });

  const handleToggle = (index: number) => {
    if(index === undefined || index <=0){
      return;
    }
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
    }else if(status !== "loading"){
      router.push('/login');
    }
    const getTags = async () =>{
      try{
        const request = await axios.get("http://localhost:5107/api/Tags/alltags");
        const data: tag[]= request.data;
        setTags(data);
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
    <div className='w-full p-2'>
      <h1 className='text-4xl text-center font-bold w-full'>One last step to setup your account</h1>
      {!session? (
        <div className='flex justify-center items-center'>
          <Spinner size='lg' className='my-6'/>
        </div>
        ) : (
          <>
            <h1 className='text-xl font-bold w-full mt-2'>Select the topics you like</h1>
            <div className='flex flex-col'>
            <Autocomplete
                className="text-black"
                inputValue={list.filterText}
                isLoading={list.isLoading}
                items={list.items}
                label="Search for tags"
                placeholder="Type to search..."
                variant="solid"
                onInputChange={list.setFilterText}
                selectedKey={value}
                onSelectionChange={(key)=> handleToggle(Number(key))}
            >
            {(item) => (
                    <AutocompleteItem key={item.idTag}>
                        {item.name}
                    </AutocompleteItem>
                )}
            </Autocomplete>
              <Button className='w-1/3 m-3' color='primary' onPress={handleSubmit}>Continue</Button>
              {activeIndices.length>0 &&
                <>
                <label className="text-black w-full my-2">Selected Tags</label>
                    <ScrollShadow orientation="horizontal" className='w-full flex flex-nowrap gap-3'>
                        {activeIndices.map(tagId => (
                        <Button
                            key={tagId}
                            className='bg-blue-500 text-white text-wrap flex-wrap'
                            onClick={() => handleToggle(tagId)}
                            radius='sm'
                            size='lg'
                        >
                            {
                                tags.filter(tag => tag.idTag === tagId)[0].name
                            }
                        </Button>
                        ))}
                    </ScrollShadow>  
                </>
                }
              <label className="text-black w-full my-2">All Tags</label>
              <ScrollShadow className="flex py-2 flex-wrap h-[300px]">
                {tags && tags.map((label) => (
                  <Button 
                    radius='sm'
                    size='lg'
                    key={label.idTag} 
                    color={activeIndices.includes(label.idTag) ? 'secondary' : 'default'}
                    className='m-1 p-8'
                    onClick={() => handleToggle(label.idTag)}
                  >
                    {label.name}
                  </Button>
                ))}
              </ScrollShadow>
            </div>
          </>
      )
      }

    </div>
  )
}