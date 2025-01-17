import { X } from "lucide-react";
import ModalFlex from "../ModalFlexLeft";
import { useState } from "react";

interface ModalBoardProps {
    isOpen: boolean;
    onClose: () => void;
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function ModalDeleteWorkspace({isOpen, onClose, buttonRef}: ModalBoardProps) {

    const [name, setName] = useState('');

    if(!isOpen) return null;
    return (
        <ModalFlex isOpen={isOpen} onClose={onClose} buttonRef={buttonRef} height={480}>
            <div className="flex justify-between items-center py-2 px-5">
                <h3 className="text-sm font-semibold text-slate-600 ml-3">
                ¿Eliminar Espacio de trabajo?
                </h3>
                <button
                className="p-1 hover:bg-slate-200 rounded-full"
                onClick={onClose}
                >
                <X className="size-4" />
                </button>
            </div>
            <div className="flex flex-col justify-between px-5 text-slate-700 gap-2 text-sm">
                <h4 className="text-base font-semibold text-slate-800 ">Introduce el nombre del Espacio de trabajo “prueba” para eliminarlo</h4>
                <p className="text-xs font-medium">Cosas que debes saber:</p>
                <ul className="text-sm font-normal list-disc  ml-5">
                    <li>Esta acción es permanente y no se puede deshacer.</li>
                    <li>Se cerrarán todos los tableros de este Espacio de trabajo.</li>
                    <li>Los administradores de tableros pueden volver a abrir tableros.</li>
                    <li>Los miembros de los tableros no podrán realizar ninguna acción en los tableros cerrados.</li>
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 w-full px-5">
                <label htmlFor="name" className="text-xs font-semibold text-slate-600">Introduce el nombre del Espacio de trabajo que quieras eliminar</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    className="w-full p-2 border border-slate-300 rounded-md text-sm"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className={`w-full p-2   rounded-md  font-semibold text-sm ${name === 'prueba' ? 'cursor-pointer bg-red-600 hover:bg-red-700 text-white' : 'cursor-not-allowed bg-gray-100 text-gray-400'} transition-all duration-300`} disabled={name !== 'prueba'}>
                    Eliminar Espacio de trabajo
                </button>
            </div>
    
            
        </ModalFlex>
        
    )
}