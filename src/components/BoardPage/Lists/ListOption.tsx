import { useRef, useState } from "react";
import { Ellipsis, X } from "lucide-react";
import ButtonOption from "./ButtonOption";
import ModalGeneric from "../../modals/ModalGeneric";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteList } from "../../../redux/states/listsSlice";

interface ListOptionProps {
    setIsModalOpen: (value: boolean) => void;
    listId: string;
}

export default function ListOption({setIsModalOpen, listId}: ListOptionProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOpenOption = () => {
        setIsOptionOpen(!isOptionOpen);
    };

    const delList = async() => {
        await dispatch(deleteList(listId))
        setIsOptionOpen(false)
    }

    return (
        <>
            <div className="relative">
                <button
                    ref={buttonRef}
                    className={`p-2 rounded-md ${isOptionOpen ? 'bg-slate-700 text-white hover:bg-slate-600' : 'text-slate-700 hover:bg-slate-300'}`}
                    onClick={handleOpenOption}
                >
                    <Ellipsis className="size-4" />
                </button>
            </div>

            <ModalGeneric
                isOpen={isOptionOpen}
                onClose={() => setIsOptionOpen(false)}
                buttonRef={buttonRef}
                height={450} // Ajusta según el contenido
                topAdd={34}
                className="w-72"
            >
                <div className="relative">
                    <h3 className="text-slate-600 font-medium text-center py-1 text-sm">
                        Enumerar Acciones
                    </h3>
                    <button
                        onClick={() => setIsOptionOpen(false)}
                        className="absolute right-3 top-0 p-2 hover:bg-slate-200 rounded-md"
                    >
                        <X className="size-4" />
                    </button>
                </div>
                <ul className="flex flex-col text-sm text-slate-800">
                    <li>
                        <ButtonOption onClick={() => {
                            setIsModalOpen(true) 
                            setIsOptionOpen(false)}}>
                            Añadir tarjeta
                        </ButtonOption>
                    </li>
                    {/* <li>
                        <ButtonOption onClick={() => console.log("Copiar lista")}>
                            Copiar lista
                        </ButtonOption>
                    </li> */}
                    <li>
                        <ButtonOption onClick={delList}>
                            Borrar esta lista
                        </ButtonOption>
                    </li>
                </ul>
            </ModalGeneric>
        </>
    );
}
