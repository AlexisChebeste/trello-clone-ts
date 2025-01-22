import type { ICard } from "../../types";


interface CardProps {
    card: ICard
  }
  

  export default function Card({ card }: CardProps) {


    return (
      <div 
        className="bg-white p-2 rounded-xl  mr-1 mb-2 shadow-card  flex items-center"
      >
        <p className="ml-2 text-sm">{card.title}</p>
      </div>
    )
  }
  
  