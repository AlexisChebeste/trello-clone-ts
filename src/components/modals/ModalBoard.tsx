import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import Button from "../ui/Button";

interface ModalBoardProps {
    workspaceId: string ;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalBoard({isOpen, onClose, workspaceId}: ModalBoardProps){
    const { createBoard } = useWorkspace();
    const [BoardName, setBoardName] = useState<string>('');
    const addBoard = () => {
        createBoard(workspaceId , BoardName)
        onClose();
        setBoardName('');
    }

    if(!isOpen){
        return null;
    }

    return (
        <div id="modal-board" className=" fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center z-50">
            <div className="bg-white w-96 h-72 flex flex-col justify-between  rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Tablero</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="board-name" className="font-semibold text-sm">Nombre:</label>
                    <input 
                        id="board-name"
                        type="text" 
                        placeholder="Nombre del tablero" 
                        value={BoardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg mb-4" 
                    />
                </div>
                <div className="flex justify-between">
                    <Button onClick={onClose} className=" text-zinc-500 font-medium px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300">
                        Cancelar
                    </Button>
                    <Button onClick={addBoard} className="bg-zinc-900 text-white px-4 py-2 rounded-lg  hover:bg-zinc-700  transition-all ease-in-out duration-300">
                        Crear Tablero
                    </Button>
                </div>
            </div>
        </div>
    )
}