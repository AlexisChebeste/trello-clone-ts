import { useRef, useState } from "react";
import ModalBoard from "../modals/AddBoard/ModalBoard";

interface AddbuttonProps {
    remaining: number;
    workspaceId: string;
}

export default function Addbutton({ remaining, workspaceId}: AddbuttonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let remainingCant = 10 - remaining;
    const buttonRef = useRef<HTMLButtonElement>(null); 
    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
        
    };
    return(
        <div>
            <button 
                ref={buttonRef}
                onClick={handleOpenModal}
                disabled={remainingCant === 0}
                aria-label='Añadir nuevo tablero'
                className={`flex flex-col h-24 items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 w-full  p-5 transition-all rounded ease-in-out duration-300 border hover:border-gray-400 hover:shadow-none ${remainingCant === 0 ? 'cursor-not-allowed ' : 'cursor-pointer'}`}
            >
                <h2 className="text-lg text-gray-700 font-semibold">Añadir tablero</h2>
                <p>{remainingCant} restantes</p>
            </button>
            <ModalBoard
                workspaceId={workspaceId}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                buttonRef={buttonRef}
                aria-labelledby="modal-title" // Asociar el modal con un título
                aria-hidden={!isModalOpen ? "true" : "false"} // Asegúrate de que el contenido detrás del modal esté oculto
            />
        </div>
        
    )
}