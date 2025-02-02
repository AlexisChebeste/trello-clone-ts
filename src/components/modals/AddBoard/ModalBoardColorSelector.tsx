
import { Check } from "lucide-react";

interface ModalBoardColorSelectorProps {
    setColor: (color: string) => void;
    color: string;
    listColor: Record<string, string>;
}


export default function ModalBoardColorSelector({setColor,color, listColor}:ModalBoardColorSelectorProps ) {

    return(
        <div className="grid grid-cols-3 items-center   gap-2">
            {Object.values(listColor).map((colorOption, idx) => (
                <button 
                    onClick={() =>setColor(colorOption)}
                    aria-label="Seleccionar color"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description" 
                    className={` w-full h-12 rounded flex justify-center items-center relative`} key={idx}>
                    <img
                        src={`/public${colorOption}`}
                        className={`w-full h-full object-cover rounded cursor-pointer hover:bg-black/20 transition-colors flex  justify-center items-center ${
                        color === colorOption ? "bg-black/20" : ""
                        } `}
                    />
                    {color === colorOption && <Check className="text-white size-3 absolute"/>}
                </button>
            ))}
        </div>
    )
}