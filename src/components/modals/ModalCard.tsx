import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import Button from "../ui/Button";

interface ModalCardProps {
    listId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalCard({isOpen, onClose, listId}: ModalCardProps){
    const { createCard } = useWorkspace();
    const [CardName, setCardName] = useState<string>('');
    const addBoard = () => {
        createCard(listId , CardName);
        onClose();
        setCardName('');
    }

    if(!isOpen){
        return null;
    }

    return (
        <div id="modal-board" className=" fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center">
            <div className="bg-white w-96 h-72 flex flex-col justify-between  rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Nueva Card</h2>
                <div className="flex flex-col gap-2">
                    <label htmlFor="list-name" className="font-semibold text-sm">Nombre:</label>
                    <input 
                        id="list-name"
                        type="text" 
                        placeholder="Nombre de la tarjeta" 
                        value={CardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg mb-4" 
                    />
                </div>
                <div className="flex justify-between">
                    <Button onClick={onClose} className=" text-zinc-500 font-medium px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300">
                        Cancelar
                    </Button>
                    <Button onClick={addBoard} className="bg-zinc-900 text-white px-4 py-2 rounded-lg  hover:bg-zinc-700  transition-all ease-in-out duration-300">
                        Crear tarjeta
                    </Button>
                </div>
            </div>
        </div>
    )
}