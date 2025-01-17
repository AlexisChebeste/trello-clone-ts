import { X } from "lucide-react";
import ModalFlex from "../ModalFlex";

interface ModalBoardProps {
    isOpen: boolean;
    onClose: () => void;
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function ModalDeleteWorkspace({isOpen, onClose, buttonRef}: ModalBoardProps) {

    if(!isOpen) return null;
    return (
        <ModalFlex isOpen={isOpen} onClose={onClose} buttonRef={buttonRef} height={50}>
            <div className="flex justify-between items-center py-4 px-5 text-slate-800">
                <h3 className="text-sm font-semibold ml-3">
                Selecciona visibilidad del Espacio
                </h3>
                <button
                className="p-1 hover:bg-slate-200 rounded-full"
                onClick={onClose}
                >
                <X className="size-4" />
                </button>
            </div>
    
            
        </ModalFlex>
        
    )
}