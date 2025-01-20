import { useEffect, useMemo, useRef, useState } from "react"
import Card from "./Card"
import ButtonAdd from "./ButtonAdd"
import { X } from "lucide-react"
import { List } from "../../types"
import { useWorkspace } from "../../hooks/useWorkspace"
import {CSS} from "@dnd-kit/utilities"
import { SortableContext, useSortable } from "@dnd-kit/sortable"

interface ListProps {
  title: string,
  list: List
}

export default function CardList({ title , list}: ListProps) {
  const {createCard} = useWorkspace()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardName, setCardName] = useState('')
  const [listName, setListName] = useState(title)

  const { 
    setNodeRef, 
    attributes, 
    listeners, 
    transform, 
    transition,
    isDragging
  } = useSortable({
      id: list.id,
      data: {
        type: "list",
        list,
      },
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  
  const listRef = useRef<HTMLDivElement>(null);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

    // Ajustar el scroll para que el input sea visible
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  const addCard = () => {
    if(cardName !== ''){
      createCard(list.id, cardName)
    }
  
    setCardName('')
    setIsModalOpen(!isModalOpen)
  }

  const cardsIds = useMemo(() => list.cards.map(card => card.id), [list.cards]);

  // Detectar clics fuera del componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        isModalOpen
      ) {
        setIsModalOpen(false); // Cerrar el modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if(isDragging){
    return <div 
    ref={setNodeRef}
    style={style}
    className="opacity-40  bg-slate-200 mt-2 p-4 rounded-xl  w-72 shrink-0 flex flex-col gap-4 text-slate-900 max-h-[80vh] justify-between"
  >
    <h3 
      className="font-medium overflow-hidden cursor-pointer py-1 px-3  w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" 
      contentEditable='true'
      role="heading" 
      aria-label="Editar título"
      spellCheck="false"
      onBlur={(e) => setListName(e.currentTarget.textContent || '')}
      suppressContentEditableWarning={true}
    >
      {listName}
    </h3>
    
    <div className="list flex-1 overflow-y-auto  px-1" ref={listRef}>
        {list.cards.map((card) => (
            <Card key={card.id} card={card} />
        ))}
      <div className={`flex flex-col w-full  mb-2 ${!isModalOpen && 'hidden'}`}>
        <input 
          type="text"  
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="p-2 pl-4  drop-shadow-sm rounded-xl text-sm mb-2  mr-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 " 
          placeholder="Ingrese un titulo"
        />
        <div className="flex gap-3 items-center ">
          <button
            onClick={addCard} 
            title="tarjeta" 
            className="bg-blue-600 rounded-lg py-2 mt-auto text-sm hover:bg-blue-700 p-2 text-white"
          >
            Añadir tarjeta
          </button>
          <X className="size-9 text-gray-800 hover:bg-slate-300 h-full p-2 rounded-md cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}/>
        </div>
        
        
      </div>
    </div>
    <ButtonAdd 
      onClick={toggleModal} 
      title="tarjeta" 
      className={`w-full h-10  -mt-3 hover:bg-gray-300 p-2 text-gray-600 hover:text-gray-800 ${isModalOpen && 'hidden'}`}/>
  </div>
  }
    
  return (
      <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-slate-200 mt-2 p-4 rounded-xl shadow-list w-72 shrink-0 flex flex-col gap-4 text-slate-900 max-h-[80vh] justify-between"
      >
        <h3 
          className="font-medium overflow-hidden cursor-pointer py-1 px-3  w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" 
          contentEditable='true'
          role="heading" 
          aria-label="Editar título"
          spellCheck="false"
          onBlur={(e) => setListName(e.currentTarget.textContent || '')}
          suppressContentEditableWarning={true}
        >
          {listName}
        </h3>
        
        <div className="list flex-1 overflow-y-auto  px-1" ref={listRef}>
          
          <SortableContext items={list.cards} >
            {list.cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
          </SortableContext>
          <div className={`flex flex-col w-full  mb-2 ${!isModalOpen && 'hidden'}`}>
            <input 
              type="text"  
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="p-2 pl-4  drop-shadow-sm rounded-xl text-sm mb-2  mr-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 " 
              placeholder="Ingrese un titulo"
            />
            <div className="flex gap-3 items-center ">
              <button
                onClick={addCard} 
                title="tarjeta" 
                className="bg-blue-600 rounded-lg py-2 mt-auto text-sm hover:bg-blue-700 p-2 text-white"
              >
                Añadir tarjeta
              </button>
              <X className="size-9 text-gray-800 hover:bg-slate-300 h-full p-2 rounded-md cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}/>
            </div>
            
            
          </div>
        </div>
        <ButtonAdd 
          onClick={toggleModal} 
          title="tarjeta" 
          className={`w-full h-10  -mt-3 hover:bg-gray-300 p-2 text-gray-600 hover:text-gray-800 ${isModalOpen && 'hidden'}`}/>

      </div>
  )
}