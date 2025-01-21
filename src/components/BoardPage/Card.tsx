import type { ICard } from "../../types";
import {CSS} from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"


interface CardProps {
    card: ICard
  }
  

  export default function Card({ card }: CardProps) {

    const { 
      setNodeRef, 
      attributes, 
      listeners, 
      transform, 
      transition,
      isDragging
    } = useSortable({
        id: card.id,
        data: {
          type: "Card",
          card,
        },
      });
  
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    }

    if(isDragging){
      return <div 
        ref={setNodeRef}
        style={style}
        className=" bg-white opacity-40 border-2 boder-rose-500  p-2 rounded-xl  mr-1 mb-2 shadow-card  flex items-center"
      >
        <p className="ml-2 text-sm">{card.title}</p>
      </div>
    }

    return (
      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-white p-2 rounded-xl  mr-1 mb-2 shadow-card  flex items-center"
      >
        <p className="ml-2 text-sm">{card.title}</p>
      </div>
    )
  }
  
  