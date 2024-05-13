import React from 'react'
import {Card, CardFooter, Image} from "@nextui-org/react";


export interface RecomendationCardProps {
  imgSrc: string;
  title: string;
  description: string;
  percentage: number;
  openModal: () => void;
  className?: string;
}

export default function RecomendationCard(recomendation: RecomendationCardProps) {
  let smallDescription = recomendation.description;
  if(recomendation.description.length > 40) {
    //trim recomendatins to 100 chars
    smallDescription = recomendation.description.substring(0, 40) + "...";
  }

  return (
    <Card isFooterBlurred isPressable isHoverable onPress={() => recomendation.openModal()} className={`w-full h-[300px] col-span-12 sm:col-span-5 ${recomendation.className}`}>
      <Image
        removeWrapper
        isZoomed
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={recomendation.imgSrc} //"https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <h4 className="text-black font-medium text-2xl text-left">{recomendation.title}</h4>
          <p className="text-black text-tiny text-left">{smallDescription}</p>
        </div>
        <p className="text-black font-light text-base">{recomendation.percentage}% para ti</p>
      </CardFooter>
    </Card>
  )
}