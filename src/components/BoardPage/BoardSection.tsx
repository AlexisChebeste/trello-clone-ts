import List from "./List"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { AppStore } from "../../redux/store"
import AddList from "./AddList"


export default function BoardSection() {
  const {idBoard} = useParams<{idBoard: string}>()
  const board = useSelector((state: AppStore) =>
    state.workspace.workspaces
      .flatMap((workspace) => workspace.boards)
      .find((board) => board.id === idBoard)
  );

  if (!board ) {
    return <div>Board no encontrado</div>;
  }
  
  if(!idBoard) return null;

  return(
    <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
      <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
          <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
      </div>
      
      <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
        <div className="flex p-4 space-x-4  items-start ">
          {board.lists.map((list) => (
              <List key={list.id} list={list} />
          ))}
          <AddList idBoard={idBoard}/>
          
        </div>
      </div>
        
    </div>
  )
}