import { useRef, useState } from "react";
import Card from "../Card";
import { IList } from "../../../types";
import { CSS } from "@dnd-kit/utilities";
import AddCard from "../AddCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { updateListTitle } from "../../../redux/states/listsSlice";
import ListOption from "./ListOption";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";

interface ListProps {
  list: IList;
}

export default function List({ list}: ListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [listName, setListName] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Configurar `useSortable` para manejar el arrastre de listas
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: list.id,
    animateLayoutChanges: defaultAnimateLayoutChanges, // Mantiene el espacio visible cuando se mueve
    data: {type: "LIST"},
  });

  const style = {
    transform: CSS.Transform.toString(transform), // Convierte la transformación en CSS
    transition: transition , // Suaviza los cambios
    opacity: isDragging ? 0.5 : 1, // Reduce la opacidad del ítem que se está arrastrando
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (listName.trim() !== list.title) {
      dispatch(updateListTitle({ id: list.id, title: listName, position: list.position }));
    }
  };

  return (
    <div 
      ref={setNodeRef} {...attributes} {...listeners} style={style}
      className="bg-slate-200 mt-2 p-4 rounded-xl shadow-list w-72 shrink-0 flex flex-col gap-4 text-slate-900 max-h-[80vh] justify-between"
    >
      {/* 🔹 CABECERA */}
      <div className="flex justify-between items-center w-full gap-2">
        {isEditing ? (
          <input
            className="font-medium overflow-hidden cursor-pointer py-1 px-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            type="text"
            value={listName}
            onBlur={handleBlur}
            onChange={(e) => setListName(e.target.value)}
            autoFocus
          />
        ) : (
          <h3 
            className="font-medium overflow-hidden cursor-pointer px-3 py-1 w-full" 
            onClick={() => setIsEditing(true)}
          >
            {listName}
          </h3>
        )}

        {/* 🔹 OPCIONES */}
        <ListOption />
      </div>

      {/* 🔹 TARJETAS */}
        <div className="list flex-1 overflow-y-auto py-0.5 px-1" ref={listRef}>
          {list.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
          
        </div>
      <AddCard idList={list.id} listRef={listRef} />
    </div>
  );
}
