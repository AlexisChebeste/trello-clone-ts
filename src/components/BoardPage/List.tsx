import { useEffect, useMemo, useRef, useState } from "react"
import Card from "./Card"
import ButtonAdd from "./ButtonAdd"
import { X } from "lucide-react"
import { ICard, IList } from "../../types"
import {CSS} from "@dnd-kit/utilities"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { useDispatch} from "react-redux"
import { addCardToList, reorderCardInBoard } from "../../redux/states/workspaceSlices"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { createPortal } from "react-dom"

interface ListProps {
  title: string,
  list: IList
}

export default function CardList({ title , list}: ListProps) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cardName, setCardName] = useState('')
  const [listName, setListName] = useState(title)
  const [cards, setCards] = useState<ICard[]>(list?.cards || [])
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
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

  function onDragStart(event: DragStartEvent){
      if(event.active.data.current?.type === 'list'){
        setActiveCard(event.active.data.current.list)
        return;
      }
    }
  
    function onDragEnd(event: DragEndEvent){
      const {active, over} = event
      if (!over) return;
  
      const activeCardId = active.id
      const overCardId = over.id
  
      if(activeCardId === overCardId) return;
  
      const newOrderCard = arrayMove(
        list?.cards.map(card => card.id) || [],
        list?.cards.findIndex(card => card.id === activeCardId) || 0,
        list?.cards.findIndex(card => card.id === overCardId) || 0
  
      )
  
      if (list ) {
        dispatch(reorderCardInBoard({listId: list.id, newOrder: newOrderCard}))
      }
      
    }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      },
    })
  );


  const addCard = () => {
    if(cardName !== ''){
      dispatch(addCardToList({listId: list.id, title: cardName}))
    }
  
    setCardName('')
    setIsModalOpen(!isModalOpen)
  }

  const cardsIds = useMemo(() => cards.map(card => card.id), [cards]);

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

  useEffect(() => {
    setCards(list.cards || [])
  }, [list, list?.id])

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
        {cards.map((card) => (
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
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="list flex-1 overflow-y-auto  px-1" ref={listRef}>
        
          <SortableContext items={cardsIds} >
            {cards.map((card) => (
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
        {createPortal(
          <DragOverlay>
            {activeCard && 
              <Card
                card={activeCard}
              />
            }
          </DragOverlay>,
          document.body
        )}

        </DndContext>
        <ButtonAdd 
          onClick={toggleModal} 
          title="tarjeta" 
          className={`w-full h-10  -mt-3 hover:bg-gray-300 p-2 text-gray-600 hover:text-gray-800 ${isModalOpen && 'hidden'}`}/>

      </div>
  )
}