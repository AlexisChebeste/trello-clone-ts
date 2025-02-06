import { useParams } from "react-router"
import AddList from "./AddList"
import { IBoard} from "../../types"
import { useDispatch ,useSelector} from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchListsByBoards } from "../../redux/states/listsSlice"
import List from "./Lists/List"
import { fetchCardsByLists } from "../../redux/states/cardsSlice"

export default function BoardSection({board}: {board: IBoard}) {
  const {idBoard} = useParams<{idBoard: string}>()
  const dispatch = useDispatch<AppDispatch>()
  const {lists} = useSelector((state : RootState) => state.lists)
  const {cards} = useSelector((state: RootState) => state.cards) 

  useEffect(() => {
    if(idBoard){
      dispatch(fetchListsByBoards(idBoard))
      dispatch(fetchCardsByLists(idBoard))
    }
  }, [dispatch, idBoard])

  

  if(!idBoard) return null;
    

  return(
    <div className={`flex-1 overflow-hidden flex flex-col h-auto  `}>
      <div className={`h-16  bg-black/20 drop-shadow-md backdrop-blur-sm items-center  flex  `}>
          <h2 className="ml-8 text-white text-lg font-bold">{board?.name}</h2>
      </div>
        <div className="board flex-1 flex overflow-x-auto overflow-y-hidden ">
          
          <div className="flex p-4 space-x-4  items-start ">
            {lists.map((list) => (
              <List key={list.id} list={list} 
              cards={cards.filter((task) => task.idList === list.id)}/>
            ))}
              
            <AddList idBoard={idBoard}/>
            
          </div>
            
        </div>
    </div>
  )
}