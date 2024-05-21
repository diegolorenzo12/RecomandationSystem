"use client";
import RecomendationCard from "../components/RecomendationCard";
import RecomendationModal from "../components/RecomendationModal";
import { useDisclosure, Button, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react"
import { useState, useEffect} from "react";

import axios from "axios";

interface recomendations{
  idConference: number
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  recommendationPercentage: number;
  time: Date;
}



export default function Recomendations() {
  const { data: session } = useSession()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [recomendations, setRecomendations] = useState<recomendations[]>([]);
  const [selectedRecomendation, setSelectedRecomendation] = useState<recomendations | null>(null);

  useEffect(()=>{
    const getRecomendations = async () =>{
      try{
        const id = session?.user?.id;
        if(id){
          const request = await axios.get(`http://localhost:5107/api/Conferences/Recommendations/${id}`);
          const data: recomendations[]= request.data;
          setRecomendations(data);
        }
      }catch(error){
      
      }
    }
    if(session){
      getRecomendations();
    }
  }, [session])

  const handleCardClick = (rec: recomendations) => {
    setSelectedRecomendation(rec);
    onOpen();
  };

  if (!session) {
    return(
      <div className='flex justify-center items-center'>
        <Spinner size='lg' />
      </div>
    )
  }

  

  
  return (
    <div className="w-full h-full">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        <h1 className="text-4xl font-bold text-center w-full">Recomendaciones</h1>
        {recomendations.map((rec, index) => (
        <div key={index} className="m-3">
            <RecomendationCard 
                key={index}
                title={rec.name}
                description={rec.description}
                imgSrc={rec.imageUrl}
                percentage={Math.trunc(rec.recommendationPercentage)}
                openModal={() => handleCardClick(rec)}
            />
        </div>
        ))}
      </div>
      {selectedRecomendation && (
          <RecomendationModal
            isOpen={isOpen}
            onClose={onClose}
            idConference={selectedRecomendation.idConference}
            title={selectedRecomendation.name}
            description={selectedRecomendation.description}
            imgSrc={selectedRecomendation.imageUrl}
            percentage={Math.trunc(selectedRecomendation.recommendationPercentage)}
          />
      )}
    </div>
  );
}
