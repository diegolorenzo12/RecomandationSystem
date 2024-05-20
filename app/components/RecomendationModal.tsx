'use client'
import React, {useState, useEffect, useRef} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react";
import { useColor } from 'color-thief-react';


interface RecomendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  title: string;
  description: string;
  percentage: number;
  className?: string;
}



export default function RecomendationModal({isOpen,onClose, imgSrc, title, description, percentage, className }: RecomendationModalProps) {
  const [textColor, setTextColor] = useState('text-white');
  const imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg==";
  const image2 = "https://nextui.org/images/card-example-6.jpeg"
  const black = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"

  const { data, loading, error } = useColor(imgSrc, 'rgbArray', {
    crossOrigin: 'anonymous',
    quality: 10
  });

  useEffect(() => {
    if (!loading && data && data.length > 0) {
      const [r, g, b] = data;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      console.log(luminance)
      setTextColor(luminance > 100 ? 'text-black' : 'text-white');
    }
  }, [data, loading, error]);

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
