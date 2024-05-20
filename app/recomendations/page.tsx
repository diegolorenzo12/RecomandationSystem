"use client";
import RecomendationCard from "../components/RecomendationCard";
import RecomendationModal from "../components/RecomendationModal";
import { useDisclosure, Button } from "@nextui-org/react";
import { faker } from "@faker-js/faker";

const generateRecommendations = (n) => {
    return Array.from({ length: n }, () => ({
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraphs(2),
      imgSrc: faker.image.imageUrl(640, 480, 'business', true, true),
      percentage: faker.datatype.float({ min: 80, max: 100, precision: 0.01 })
    }));
  };


export default function Recomendations() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const recommendations = generateRecommendations(10);
  
  return (
    <div className="w-full h-full">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        <h1 className="text-4xl font-bold text-center w-full">Recomendaciones</h1>
        {recommendations.map((rec, index) => (
        <div key={index} className="m-3">
            <RecomendationCard 
                key={index}
                title={rec.title}
                description={rec.description}
                imgSrc={rec.imgSrc}
                percentage={rec.percentage}
                openModal={onOpen}
            />
        </div>
        ))}
      </div>
        <RecomendationModal 
          isOpen={isOpen} 
          onClose={onClose} 
          title={recommendations[0]?.title} // Example: using the first recommendation for the modal
          description={recommendations[0]?.description}
          imgSrc={recommendations[0]?.imgSrc}
          percentage={recommendations[0]?.percentage}
        />
    </div>
  );
}
