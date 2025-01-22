import { useRef, useState } from "react"
import Card from "./Card"
import {IList } from "../../types"
import AddCard from "./AddCard"

interface ListProps {
  list: IList
}

export default function CardList({ list}: ListProps) {
  const [listName, setListName] = useState(list.title)
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div 
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
      <div className="list flex-1 overflow-y-auto py-0.5  px-1" ref={listRef}>
      
          {list.cards.map((card) => (
              <Card key={card.id} card={card} />
          ))}
          
          <AddCard idList={list.id} listRef={listRef}/>
          
      </div>

    </div>
  )
}