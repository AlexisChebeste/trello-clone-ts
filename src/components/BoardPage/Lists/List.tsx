import { useMemo, useRef, useState } from "react";
import Card from "../Cards/Card";
import { ICard, IList } from "../../../types";
import AddCard from "../Cards/AddCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { updateListTitle } from "../../../redux/states/listsSlice";
import ListOption from "./ListOption";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

interface ListProps {
  list: IList;
  cards: ICard[];
}

export default function List({ list, cards}: ListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [listName, setListName] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable(
    {
      id: list.id, 
      data: {
        type: "list", 
        index: list.position
      }
    }
  )

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (listName.trim() !== list.title) {
      dispatch(updateListTitle({ id: list.id, title: listName, position: list.position }));
    }
  };

  const cardsIds = useMemo(() => cards.map((card) => card.id), [cards]);


  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-slate-200 mt-2 pt-4 px-4 rounded-xl shadow-list w-72 shrink-0 flex flex-col gap-4 text-slate-900 max-h-[80vh] justify-between relative overflow-visible"
    >
      {/* 🔹 CABECERA */}
      <div className="flex justify-between items-center w-full gap-2 ">
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
        <ListOption setIsModalOpen={setIsModalOpen}/>
      </div>

      {/* 🔹 TARJETAS */}
        <div 
          className="list flex-1 overflow-y-auto py-0.5 px-1" 
          ref={listRef}
        >
          <SortableContext items={cardsIds} strategy={verticalListSortingStrategy}>
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </SortableContext>
          <AddCard idList={list.id} listRef={listRef} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      
    </div>
  );
}
