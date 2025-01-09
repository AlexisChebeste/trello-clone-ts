
import { Check } from "lucide-react";

interface ModalBoardColorSelectorProps {
    setColor: (color: string) => void;
    color: string;
    listColor: Record<string, string>;
}


export default function ModalBoardColorSelector({setColor,color, listColor}:ModalBoardColorSelectorProps ) {

    return(
        <div className="grid grid-cols-3 items-center   gap-2">
            {Object.values(listColor).map((colorOption) => (
                <div className={`${colorOption} w-21 h-12   rounded flex justify-center items-center`}>
                    <button
                        key={colorOption}
                        onClick={() =>setColor(colorOption)}
                        aria-label="Seleccionar color"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                        className={`w-full h-full rounded cursor-pointer hover:bg-black/20 transition-colors flex  justify-center items-center ${
                        color === colorOption ? "bg-black/20" : ""
                        } `}
                    >
                        {color === colorOption && <Check className="text-white size-3"/>}
                    </button>
                </div>
            ))}
        </div>
    )
}