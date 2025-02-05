import { useSortable } from "@dnd-kit/sortable";
import type { ICard } from "../../types";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
    card: ICard
    isDraggingOverlay?: boolean;
  }
  

  export default function Card({ card, isDraggingOverlay }: CardProps) {
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
        type: "CARD",
        card,
      },
      disabled: isDraggingOverlay,
    })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };
  

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
  
  