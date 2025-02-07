import { useParams } from "react-router"
import AddList from "./Lists/AddList"
import { IBoard, ICard, IList} from "../../types"
import { useDispatch ,useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useMemo, useState } from "react"
import { fetchListsByBoards, moveList } from "../../redux/states/listsSlice"
import { fetchCardsByLists, moveCard, moveCardOptimistic } from "../../redux/states/cardsSlice"
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor ,TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import List from "./Lists/List"
import { createPortal } from "react-dom"
import Card from "./Cards/Card"
import BoardHeader from "./BoardHeader"

export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const {lists} = useSelector((state : RootState) => state.lists)
  const {cards} = useSelector((state: RootState) => state.cards) 
  const [activeColumn, setActiveColumn] = useState<IList | null>(null)
  const [activeCard, setActiveCard] = useState<ICard | null>(null)

  useEffect(() => {
    if (!idBoard) return;
  
    let isMounted = true;
  
    const fetchData = async () => {
      if (isMounted) {
        dispatch(fetchListsByBoards(idBoard));
        dispatch(fetchCardsByLists(idBoard));
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [idBoard, dispatch]);
  
  if(!idBoard) return null;

  const sensors = useSensors(
    useSensor(TouchSensor,{
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      }
    }),
    useSensor(MouseSensor,{
      activationConstraint: {
        distance: 10,
      }
    }),
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    const {active} = event;

    if(!active) return;

    if(active.data.current?.type === "list"){
      const list = lists.find((list) => list.id === active.id);
      if(list) setActiveColumn(list);
      return;
    }
    if(active.data.current?.type === "card"){
      const card = cards.find((card) => card.id === active.id);
      if(card) setActiveCard(card);
      return;
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveCard(null);
    const { active, over } = event;
  
    if (!over) return;
  
    const activeId = active.id.toString();
    const overId = over.id.toString();
  
    if (activeId === overId) return;
  
    const activeIndex = lists.findIndex((list) => list.id === activeId);
    const overIndex = lists.findIndex((list) => list.id === overId);
  
    if (activeIndex !== -1 && overIndex !== -1) {
      const newLists = [...lists];
      const [movedList] = newLists.splice(activeIndex, 1);
      newLists.splice(overIndex, 0, movedList);
  
      dispatch(
        moveList({
          idBoard,
          idList: activeId,
          newPosition: overIndex,
        })
      );
    }
  };
  

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const activeId = active.id.toString();
    const overId = over.id.toString();
  
    if (activeId === overId) return;
  
    const activeCard = cards.find((card) => card.id === activeId);
    const overCard = cards.find((card) => card.id === overId);
    const overList = lists.find((list) => list.id === overId);
  
    if (!activeCard) return;
  
    let newPosition: number | undefined;
    let newListId: string | undefined;
  
    // 🔹 Si la tarjeta se mueve dentro de la misma lista
    if (overCard && activeCard.idList === overCard.idList) {
      if (activeCard.position !== overCard.position) {
        newListId = activeCard.idList;
        newPosition = overCard.position;
      }
    }
  
    // 🔹 Si la tarjeta se mueve a otra lista vacía
    if (overList && activeCard.idList !== overList.id) {
      const cardsInNewList = cards.filter((card) => card.idList === overList.id);
      newListId = overList.id;
      newPosition = cardsInNewList.length;
    }
  
    // 🔹 Si la tarjeta se mueve sobre otra tarjeta en otra lista
    if (overCard && activeCard.idList !== overCard.idList) {
      newListId = overCard.idList;
      newPosition = overCard.position;
    }
  
    if (newListId !== undefined && newPosition !== undefined) {
      // 🔹 Optimistic UI Update (Actualiza el estado local rápido)
      dispatch(moveCardOptimistic({ newListId, cardId: activeCard.id, newPosition }));
    
      // 🔹 API Call (Actualiza en el backend)
      dispatch(moveCard({ newListId, cardId: activeCard.id, newPosition }));
    }
  };

  const listsIds = useMemo(() => lists.map((list) => list.id), [lists]);

  return(
    
      <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
        <BoardHeader board={board}/>
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
          <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
            
            <div className="flex p-4 space-x-4  items-start ">
              <SortableContext items={listsIds} strategy={horizontalListSortingStrategy}>
                {lists.map((list) => (
                  <List key={list.id} list={list} cards={cards.filter((card) => card.idList === list.id)} />
                ))}
              </SortableContext>
              <AddList idBoard={idBoard}/>
                
            </div>
            
          </div>

          {createPortal(
            <DragOverlay>
              {activeColumn ?(
                <List list={activeColumn} cards={cards.filter((card) => card.idList === activeColumn.id)} />
              ) 
                : null
              }
              {activeCard ? (
                <Card card={activeCard} />
              ): null}
            </DragOverlay>
          , document.body
          )}
        </DndContext>
      </div>
  )
}