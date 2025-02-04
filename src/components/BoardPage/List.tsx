import { useRef, useState } from "react"
import Card from "./Card"
import {IList } from "../../types"
import AddCard from "./AddCard"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { updateListTitle } from "../../redux/states/listsSlice"
import { Ellipsis } from "lucide-react"

interface ListProps {
  list: IList
}

export default function CardList({ list}: ListProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [listName, setListName] = useState(list.title)
  const [isEditing, setIsEditing] = useState(false)

  const handleBlur = () => {
    setIsEditing(false)

    if(listName.trim() !== list.title) {
      dispatch(updateListTitle({id: list.id, title: listName, position: list.position}))
    }
  }

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="bg-slate-200 mt-2 p-4 rounded-xl shadow-list w-72 shrink-0 flex flex-col gap-4 text-slate-900 max-h-[80vh] justify-between"
    >
      <div className="flex justify-between items-center w-full gap-2">
        {isEditing ?(
          <input 
            className="font-medium overflow-hidden cursor-pointer py-1 px-3  w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white" 
            type="text"
            value={listName}
            onBlur={handleBlur}
            onChange={(e) => setListName(e.target.value)}
            autoFocus
          />
          ) : (
          <h3 className="font-medium overflow-hidden cursor-pointer px-3 py-1 w-full" onClick={() => setIsEditing(true)}>
            {listName}
          </h3>)
        }
        <button 
          className="p-2 rounded-md hover:bg-slate-300" 
          onClick={() => console.log("clicked")}
        >
          <Ellipsis className="size-4 text-slate-700"/>
        </button>
      </div>
      
      
      <div className="list flex-1 overflow-y-auto py-0.5  px-1" ref={listRef}>
      
          {list.cards.map((card) => (
              <Card key={card.id} card={card} />
          ))}
          
          <AddCard idList={list.id} listRef={listRef}/>
          
      </div>

    </div>
  )
}