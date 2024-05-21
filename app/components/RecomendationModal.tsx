'use client'
import React, {useState, useEffect, useRef} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react";
import { useColor } from 'color-thief-react';
import axios from 'axios';
import { useSession } from "next-auth/react"


interface RecomendationModalProps {
  idConference: number;
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  title: string;
  description: string;
  percentage: number;
  className?: string;
}



export default function RecomendationModal({isOpen, onClose, idConference, imgSrc, title, description, percentage, className }: RecomendationModalProps) {
  const [textColor, setTextColor] = useState('text-white');
  const [likeColor, setLikeColor] = useState("default")
  const { data: session } = useSession()

  const { data, loading, error } = useColor(imgSrc, 'rgbArray', {
    crossOrigin: 'anonymous',
    quality: 10
  });

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      const [r, g, b] = data;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      console.log(luminance)
      setTextColor(luminance > 80 ? 'text-black' : 'text-white');
    }
  }, [data, loading, error]);

  const handleAssistir =async ()=>{
    try{
      const formData = new FormData();
      formData.append('userId', session?.user?.id.toString());
      formData.append('conferenceId', idConference.toString());
      const response = await axios.post('http://localhost:5107/api/Users/AssociateConferenceTags', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status === 200) {
        setLikeColor("primary");
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Modal 
        size="xl" 
        isOpen={isOpen} 
        onClose={onClose} 
        className={`p-5  ${className}`}
        backdrop='blur'      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="pt-6 relative">
                    <Image
                      isBlurred
                      alt="Card example background"
                      className="relative w-full aspect-video overflow-hidden object-cover object-center"
                      src={imgSrc}
                      shadow='lg'
                    />
                  <div className={`z-10 absolute bottom-0 left-0 w-full flex flex-row justify-between items-center ${textColor}`}>
                    <p className="text-xl font-semibold m-4 align-middle">{title}</p>
                    <p className="font-light text-base align-middle">{percentage}% para ti</p>
                  </div>   
                </div>
                <p> 
                  {description}
                </p>
              </ModalBody>
              <ModalFooter>
              <Button color={likeColor} variant="solid" onPress={handleAssistir}>
                  Voy a asistir
              </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}
