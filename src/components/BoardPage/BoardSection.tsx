import { useParams } from "react-router"
import AddList from "./AddList"
import { IBoard, ICard, IList } from "../../types"
import { useDispatch ,useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useMemo, useState } from "react"
import { fetchListsByBoards, moveList, moveListOptimistic } from "../../redux/states/listsSlice"
import { DndContext, DragEndEvent,  DragOverlay,  PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext, } from "@dnd-kit/sortable"
import List from "./Lists/List"
import { createPortal } from "react-dom"
import Card from "./Card"


export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const {lists} = useSelector((state : RootState) => state.lists)
  const {cards} = useSelector((state: RootState) => state.cards) 
  const [activeList, setActiveList] = useState<IList | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  useEffect(() => {
    if(idBoard){
      dispatch(fetchListsByBoards(idBoard))
    }
  }, [dispatch, idBoard])

  

  if(!idBoard) return null;

  // Sensores para evitar que el drag se active al hacer clic en inputs o botones
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const handleDragStart = (event: any) => {
    const {active} = event;
    
    if(active.data.current?.type === "LIST") {
      const list = lists.find((list) => list.id === active.id);
      if(list) setActiveList(list);
    }
    if(active.data.current?.type === "CARD") {
      const card = cards.find((card) => card.id === active.id);
      if(card) setActiveCard(card);
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveList(null);
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if(activeId === overId) return;
    const isActiveList = active.data.current?.type === "LIST";
    const isOverList = over.data.current?.type === "LIST";


    if (isActiveList && isOverList) {
      const oldIndex = lists.findIndex((list) => list.id === activeId);
      const newIndex = lists.findIndex((list) => list.id === overId);
  
      if (oldIndex === newIndex) return;
  
      // 1️⃣ Mueve la lista en el estado local (actualización optimista)
      dispatch(moveListOptimistic({ idList: activeId, newPosition: newIndex }));
  
      // 2️⃣ Luego, envía la acción real al backend
      dispatch(moveList({ idBoard, idList: activeId, newPosition: newIndex }));
    }
    
  };

    

  const listIds = useMemo(() => lists.map((list) => list.id), [lists]);

  return(
    <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
      <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
          <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
      </div>
      <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
        <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd} 
        >
          <div className="flex p-4 space-x-4  items-start ">
            <SortableContext  items={listIds} strategy={horizontalListSortingStrategy}>
              {lists.map((list) => (
                <List key={list.id} list={list} 
                cards={cards.filter(card => card.idList === list.id)}/>
              ))}
              
            </SortableContext>
            <AddList idBoard={idBoard}/>
            
          </div>
          {/* 🔹 Overlay para mejorar la apariencia del drag */}
          {createPortal(
            <DragOverlay>
              {activeList ? (
                <List list={activeList} cards={cards.filter(card => card.idList === activeList.id)} isDraggingOverlay />
              ) : null}
              {activeCard ? <Card card={activeCard} isDraggingOverlay /> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  )
}