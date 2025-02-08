import { useSortable } from "@dnd-kit/sortable";
import type { ICard } from "../../../types";
import {CSS} from '@dnd-kit/utilities';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { Pencil} from "lucide-react";
import { updateTitleCard } from "../../../redux/states/cardsSlice";
import ModalCard from "./ModalCard";

interface CardProps {
    card: ICard;
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
  }
  

export default function Card({ card, isOpened, setIsOpened }: CardProps) {
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
    },
    disabled: isOpened
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
          className="overflow-hidden cursor-pointer h-10  px-3 w-full  rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:bg-white"
          type="text"
          value={cardName}
          onBlur={handleBlur}
          onChange={(e) => setCardName(e.target.value)}
          autoFocus
        />
      ) : (
        <div
          className="group flex justify-between items-center h-10 px-3  overflow-hidden cursor-pointer text-sm   w-full  hover:ring-2 hover:ring-blue-500  hover:rounded-xl text-slate-600"
          onClick={() => setIsOpened(true)}
        >
          {cardName}
          <button 
            className="opacity-0 group-hover:opacity-100 focus:outline-none hover:bg-gray-200 p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Pencil className="size-4" />
          </button>
        </div>
        
      )}


      {isOpened && (
        <ModalCard card={card} setIsOpened={setIsOpened} handleBlur={handleBlur}  />
      )}
    </div>
  )
}
  
  