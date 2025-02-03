import List from "./List"
import { useParams } from "react-router"
import AddList from "./AddList"
import { IBoard } from "../../types"


export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  
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