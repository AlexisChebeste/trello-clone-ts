import { useEffect, useMemo, useState } from "react"
import CardList from "./List"
import ButtonAdd from "./ButtonAdd"
import { X } from "lucide-react"
import { useParams } from "react-router"
import { useWorkspace } from "../../hooks/useWorkspace"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { Card, List } from "../../types"
import { createPortal } from "react-dom"


export default function BoardSection() {
  const {workspaces, createList, reorderLists} = useWorkspace()
  const {idBoard} = useParams<{idBoard: string}>()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [listName, setListName] = useState('')
  const [activeColumn, setActiveColumn] = useState<List | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const board = workspaces
    .flatMap(workspace => workspace.boards)
    .find(board => board.id === idBoard);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      },
    })
  );
  
  function onDragStart(event: DragStartEvent){
    if(event.active.data.current?.type === 'list'){
      setActiveColumn(event.active.data.current.list)
      return;
    }
  }

  function onDragEnd(event: DragEndEvent){
    const {active, over} = event
    if (!over) return;

    const activeColumnId = active.id
    const overColumnId = over.id

    if(activeColumnId === overColumnId) return;

    const newOrderList = arrayMove(
      board?.lists.map(list => list.id) || [],
      board?.lists.findIndex(list => list.id === activeColumnId) || 0,
      board?.lists.findIndex(list => list.id === overColumnId) || 0

    )

    if (board) {
      reorderLists(board.id, newOrderList)
    }
    
  }

  const [columns, setColumns] = useState<List[]>(board?.lists || [])
  

  const addList = () => {
      if(listName !== '' && idBoard){
        createList(idBoard, listName)
      }
      setListName('')
      setIsModalOpen(!isModalOpen)
  }
  
  useEffect(() => {
    setColumns(board?.lists || [])
  }, [workspaces, board?.id])

  const columnLists = useMemo(() => columns?.map((col) => col.id), [columns])
  if (board === undefined) return <h1>404</h1>
  if (idBoard === undefined) return <h1>404</h1>
  if (columnLists === undefined) return <h1>404</h1>
  if(idBoard === undefined) return <h1>404</h1>;

  return(
      <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
        <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
            <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
        </div>
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} >
          <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
            <div className="flex p-4 space-x-4  items-start ">
              <SortableContext items={columnLists}>
                {columns.map((list) => (
                    <CardList key={list.id} title={list.title} list={list}/>
                ))}
              </SortableContext>
              <div className="w-72 mt-2">
                <div className={`bg-slate-200 rounded-xl p-2 flex flex-col w-full  mb-2 ${!isModalOpen && 'hidden'}`}>
                  <input 
                    type="text"  
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    className="p-2  drop-shadow-sm rounded-lg text-sm mb-2 mr-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 " 
                    placeholder="Ingrese el nombre de la lista"
                  />
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={addList} 
                      title="tarjeta" 
                      className="bg-blue-600 rounded-md py-2 mt-auto text-sm hover:bg-blue-700 px-3 text-white font-semibold"
                    >
                      Añadir lista
                    </button>
                    <X className="size-9 text-gray-800 hover:bg-slate-300 h-full p-2 rounded-md cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}/>
                  </div>
                  
                  
                </div>
                <ButtonAdd 
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    title="lista" 
                    className={`py-3 w-full px-4  shrink-0  bg-white/40 hover:bg-white/30 text-white  ${isModalOpen && 'hidden'}`} 
                  />
              </div>
              
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && 
                <CardList 
                  list={activeColumn}
                  title={activeColumn.title}
                />
              }
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
  )
}