"use client";
import RecomendationCard from "./components/RecomendationCard";
import RecomendationModal from "./components/RecomendationModal";
import { useDisclosure, Button } from "@nextui-org/react";

const recomendation= {
  imgSrc: "https://nextui.org/images/card-example-6.jpeg",
  title: "Title Here",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  precentage: 94.5
}


export default function Home() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  
  return (
    <main className="w-full h-full">
      <div className="flex flex-col justify-center items-center w-1/4">
        <RecomendationCard 
          title={recomendation.title}
          description={recomendation.description}
          imgSrc={recomendation.imgSrc}
          precentage={recomendation.precentage}
          openModal={onOpen}
        />
        <RecomendationCard 
          title={recomendation.title}
          description={recomendation.description}
          imgSrc={recomendation.imgSrc}
          precentage={recomendation.precentage}
          openModal={onOpen}
        />
        <RecomendationCard 
          title={recomendation.title}
          description={recomendation.description}
          imgSrc={recomendation.imgSrc}
          precentage={recomendation.precentage}
          openModal={onOpen}
        />
        <RecomendationModal 
          isOpen={isOpen} 
          onClose={onClose} 
          title={recomendation.title}
          description={recomendation.description}
          imgSrc={recomendation.imgSrc}
          precentage={recomendation.precentage}
        />
      </div>
    </main>
  );
}
