import { useDispatch } from "react-redux"
import ButtonAdd from "./ButtonAdd"
import { useState } from "react"
import { addListToBoard } from "../../redux/states/workspaceSlices"
import { X } from "lucide-react"


export default function AddList({idBoard}: {idBoard: string}) {
    
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [listName, setListName] = useState('')
    const addList = () => {
        if(listName !== '' && idBoard){
          dispatch(addListToBoard({boardId: idBoard, title:listName}))
        }
        setListName('')
        setIsModalOpen(!isModalOpen)
      }

    return(
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
    )
}