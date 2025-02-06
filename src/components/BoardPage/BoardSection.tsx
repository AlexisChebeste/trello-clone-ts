import { useParams } from "react-router"
import AddList from "./AddList"
import { IBoard, ICard, IList} from "../../types"
import { useDispatch ,useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useMemo, useState } from "react"
import { fetchListsByBoards, moveList } from "../../redux/states/listsSlice"
import { fetchCardsByLists, moveCard } from "../../redux/states/cardsSlice"
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor ,TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import List from "./Lists/List"
import { createPortal } from "react-dom"
import Card from "./Card"

export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const {lists} = useSelector((state : RootState) => state.lists)
  const {cards} = useSelector((state: RootState) => state.cards) 
  const [activeColumn, setActiveColumn] = useState<IList | null>(null)
  const [activeCard, setActiveCard] = useState<ICard | null>(null)


  useEffect(() => {
    if(idBoard){
      dispatch(fetchListsByBoards(idBoard))
      dispatch(fetchCardsByLists(idBoard))
    }
  }, [dispatch, idBoard])

  if(!idBoard) return null;


  const sensors = useSensors(
    useSensor(TouchSensor,{
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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
    const { active, over } = event;
  
    if(!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if(activeId === overId) return;

    if(active.data.current?.type === "list"){
      const activeList = lists.find((list) => list.id === activeId);
      const overList = lists.find((list) => list.id === overId);

      if(activeList && overList){
        dispatch(moveList({idBoard: idBoard, idList: activeList.id, newPosition: overList.position}))
      }
      return;
    }
    
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
  
    if(!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if(activeId === overId) return;

    const isActiveATask = active.data.current?.type === "card";
    const isOverATask = over.data.current?.type === "card";
    const isOverAColumn = over.data.current?.type === "list";

    if(isActiveATask && isOverATask){
      const activeCard = cards.find((card) => card.id === activeId);
      const overCard = cards.find((card) => card.id === overId);

      if(activeCard && overCard){
        dispatch(moveCard({newListId: overCard.idList, cardId: activeCard.id, newPosition: overCard.position}))
      }

    }

    if(isActiveATask && isOverAColumn){
      const activeCard = cards.find((card) => card.id === activeId);
      const overList = lists.find((list) => list.id === overId);

      if(activeCard && overList){
        dispatch(moveCard({newListId: overList.id, cardId: activeCard.id, newPosition: 0}))
      }
    }
    
  }


  const listsIds = useMemo(() => lists.map((list) => list.id), [lists]);


  return(
    
      <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
        <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
            <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
        </div>
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
        )

          }
        </DndContext>
      </div>
  )
}