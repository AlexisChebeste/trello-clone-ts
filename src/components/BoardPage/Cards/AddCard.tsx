import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonAdd from "../ButtonAdd";
import { AppDispatch } from "../../../redux/store";
import { createCard } from "../../../redux/states/cardsSlice";

interface AddCardProps {
    idList: string;
    listRef: React.RefObject<HTMLDivElement>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function AddCard({idList, listRef, isModalOpen, setIsModalOpen}: AddCardProps) {
    
    
    const dispatch = useDispatch<AppDispatch>()
    const [cardName, setCardName] = useState('')

    const addCard = () => {
        if(cardName !== ''){
          dispatch(createCard({listId: idList, title: cardName}))
        }
      
        setCardName('')
        setIsModalOpen(!isModalOpen)
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        // Ajustar el scroll para que el input sea visible
        setTimeout(() => {
            if (listRef.current) {
            listRef.current.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth",
            });
            }
        }, 0);
    };
    
       // Detectar clics fuera del componente
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                listRef.current &&
                !listRef.current.contains(event.target as Node) &&
                isModalOpen
            ) {
                setIsModalOpen(false); // Cerrar el modal
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={`flex flex-col w-full   ${!isModalOpen && 'hidden'}`}>
                <input 
                type="text"  
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="p-2 pl-4  drop-shadow-sm rounded-xl text-sm mb-2  mr-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 " 
                placeholder="Ingrese un titulo"
                />
                <div className="flex gap-3 items-center ">
                <button
                    onClick={addCard} 
                    title="tarjeta" 
                    className="bg-blue-600 rounded-lg py-2 mt-auto text-sm hover:bg-blue-700 p-2 text-white"
                >
                    Añadir tarjeta
                </button>
                <X className="size-9 text-gray-800 hover:bg-slate-300 h-full p-2 rounded-md cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}/>
                </div>
                
                
            </div>
            <div className="py-3">
                <ButtonAdd 
                    onClick={toggleModal} 
                    title="tarjeta" 
                    className={`w-full h-10 rounded-xl -mt-3 hover:bg-gray-300 p-2 text-gray-600 hover:text-gray-800 ${isModalOpen && 'hidden'}`}
                />
            </div>
        </>
    )
}