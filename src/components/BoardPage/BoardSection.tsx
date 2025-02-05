import { useParams } from "react-router"
import AddList from "./AddList"
import { IBoard } from "../../types"
import { useDispatch ,useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchListsByBoards, moveList } from "../../redux/states/listsSlice"
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { horizontalListSortingStrategy, SortableContext, } from "@dnd-kit/sortable"
import List from "./Lists/List"


export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const {lists} = useSelector((state : RootState) => state.lists)

  useEffect(() => {
    if(idBoard){
      dispatch(fetchListsByBoards(idBoard))
    }
  }, [dispatch, idBoard])


  if(!idBoard) return null;

  // Sensores para evitar que el drag se active al hacer clic en inputs o botones
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.data.current?.type === "LIST" && over.data.current?.type === "LIST") {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over.id);
      dispatch(moveList({ idBoard: idBoard, idList: active.id.toString(), newPosition: newIndex }));
    }
  };


  return(
    <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
      <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
          <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
      </div>
      <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
          
            
              <div className="flex p-4 space-x-4  items-start ">
                <SortableContext  items={lists.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
                  {lists.map((list) => (
                    <List key={list.id} list={list} />
                  ))}
                  
                </SortableContext>
                <AddList idBoard={idBoard}/>
                
              </div>
            
        </DndContext>
      </div>
    </div>
  )
}