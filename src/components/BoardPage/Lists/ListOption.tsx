import { Ellipsis, X } from "lucide-react";
import { useState } from "react";
import ButtonOption from "./ButtonOption";


export default function ListOption() {
    const [isOptionOpen, setIsOptionOpen] = useState(false)

    const handleOpenOption = () => {
        setIsOptionOpen(!isOptionOpen)
    }


    return(
        <div className="relative">
            <button 
                className={`p-2 rounded-md  ${isOptionOpen ? 'bg-slate-700 text-white hover:bg-slate-600' : 'text-slate-700 hover:bg-slate-300'} `} 
                onClick={handleOpenOption}
            >
                <Ellipsis className="size-4 "/>
            </button>
            {isOptionOpen && (
                <div className="absolute top-9 left-0 bg-white py-4 rounded-md shadow-md w-72 flex flex-col gap-4">
                    <div className="relative">
                        <h3 className="text-slate-600 font-medium text-center py-1 text-sm">Enumerar Acciones</h3>
                        <button onClick={handleOpenOption} className="absolute right-3 top-0 p-2 hover:bg-slate-200 rounded-md ">
                            <X className=" size-4 " />
                        </button>
                    </div>
                    <ul className="flex flex-col text-sm text-slate-800" >
                        <li>
                            <ButtonOption onClick={() => console.log('Añadir tarjeta')}>
                                Añadir tarjeta
                            </ButtonOption>
                        </li>
                        <li>
                            <ButtonOption onClick={() => console.log('Copiar lista')}>
                                Copiar lista
                            </ButtonOption>
                        </li>
                        <li>
                            <ButtonOption onClick={() => console.log('Mover lista')}>
                                Mover lista
                            </ButtonOption>
                        </li>
                        <li>
                            <ButtonOption onClick={() => console.log('Mover todas las tarjetas de esta lista')}>
                                Mover todas las tarjetas de esta lista
                            </ButtonOption>
                        </li>
                        <li>
                            <ButtonOption onClick={() => console.log('Archivar esta lista')}>
                                Archivar esta lista
                            </ButtonOption>
                        </li>
                        <li>
                            <ButtonOption onClick={() => console.log('Archivar todas las tarjetas de esta lista')}>
                                Archivar todas las tarjetas de esta lista
                            </ButtonOption>
                        </li>
                    </ul>
                </div>

            )}

        </div>
    )
}