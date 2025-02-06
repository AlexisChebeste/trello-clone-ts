import { useSortable } from "@dnd-kit/sortable";
import type { ICard } from "../../types";
import {CSS} from '@dnd-kit/utilities';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Pencil } from "lucide-react";
import { updateTitleCard } from "../../redux/states/cardsSlice";

interface CardProps {
    card: ICard;
  }
  

export default function Card({ card }: CardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [cardName, setCardName] = useState(card.title);
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      index: card.position
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (cardName.trim() !== card.title) {
      dispatch(updateTitleCard({cardId: card.id, title: cardName}));
    }
  };
    

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white rounded-xl mr-1 mb-2 shadow-card  flex items-center"
    >
      
      {isEditing ? (
        <input
          className="font-medium overflow-hidden cursor-pointer py-1 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          type="text"
          value={cardName}
          onBlur={handleBlur}
          onChange={(e) => setCardName(e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className="group flex justify-between items-center py-2 px-3  overflow-hidden cursor-pointer text-sm   w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white hover:ring-2 hover:ring-blue-500  hover:rounded-xl text-slate-600"
          
        >
          {cardName}
          <button 
            className="opacity-0 group-hover:opacity-100 focus:outline-none hover:bg-gray-200 p-1 rounded-full"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="size-4" />
          </button>
        </div>
        
      )}
    </div>
  )
}
  
  