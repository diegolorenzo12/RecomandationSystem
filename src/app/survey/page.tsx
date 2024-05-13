'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react'
import { faker } from "@faker-js/faker";


export default function Survey() {
  return (
    <div className='w-full'>
      <h1 className='text-4xl text-center font-bold w-full'>Categorias</h1>
        <h1 className='text-4xl font-bold w-full'>Category 1</h1>
            <ScrollableButtons></ScrollableButtons>
            <ScrollableButtons></ScrollableButtons>
        <h1 className='text-4xl font-bold w-full'>Category 2</h1>
            <ScrollableButtons></ScrollableButtons>
            <ScrollableButtons></ScrollableButtons>
        <h1 className='text-4xl font-bold w-full'>Category 3</h1>
            <ScrollableButtons></ScrollableButtons>
            <ScrollableButtons></ScrollableButtons>
    </div>
  )
}


const ScrollableButtons: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [buttons, setButtons] = useState<string[]>([]);

    const handleToggle = (index: number) => {
      if (activeIndices.includes(index)) {
          // If the index is already active, remove it from the active indices array
          setActiveIndices(activeIndices.filter(i => i !== index));
      } else {
          // Otherwise, add the index to the active indices array
          setActiveIndices([...activeIndices, index]);
      }
  };

   useEffect(()=>{
      setButtons(Array.from({ length: 12 }, () => faker.commerce.department()))
    }, [])

    //if button pressed change color to primary
    return (
      <div className="flex overflow-x-auto scrollbar-hide py-2">
        {buttons.map((label, index) => (
          <Button 
            radius='sm' 
            size='lg' 
            key={index} 
            color={activeIndices.includes(index) ? 'primary' : 'default'}
            className='m-1 p-8'
            onClick={() => handleToggle(index)}
          >
            {label}
          </Button>
        ))}
      </div>
    );
  };