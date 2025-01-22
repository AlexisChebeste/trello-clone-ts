import { Ellipsis, X } from "lucide-react";
import { useState } from "react";
import { IBoard } from "../../types";

export function ModalCloseBoard({board, onArchive}: {board: IBoard, onArchive: (id: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);
    const isBoardPage = location.pathname.includes("b/");

    const handleArchived = () => {
        onArchive(board.id);
        setIsOpen(!isOpen);
    }


    return(
        <div className="group relative">
            <button className={`p-2  ${isBoardPage ? 'hover:bg-white/30' : 'hover:bg-gray-200'}  rounded-md transition-all ease-in-out duration-200 ${isOpen ? 'sticky' : 'hidden'} group-hover:flex mr-2 ` }
            onClick={toggleModal}>
                <Ellipsis className='size-4 '/>
            </button>
            <div 
                className={`${isOpen ? 'absolute' : 'hidden'} top-10 left-0 w-72 bg-white shadow-md rounded-md border border-gray-200 flex flex-col p-3 gap-4 text-gray-600 transition-all ease-in-out duration-200 z-50 `}
            >
                <div className="flex justify-between items-center">
                    <h3 className='text-sm font-semibold text-center'>¿Deseas cerrar el tablero?</h3>
                    <X className='hover:bg-slate-200 p-1  rounded-full' onClick={toggleModal}/>
                </div>
                <p className="text-sm">Puedes buscar y volver a abrir los tableros cerrados en la parte inferior de tu página de tableros.</p>
                <button className={`w-full text-sm font-medium text-white bg-red-500 hover:bg-red-700 rounded-md py-2 `}
                onClick={handleArchived}>Cerrar tablero</button>
            </div>
                
        </div>
    )
}