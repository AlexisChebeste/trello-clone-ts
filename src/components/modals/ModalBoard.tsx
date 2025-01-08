import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import Button from "../ui/Button";
import {colors} from "../../lib/colors";
import { Check } from "lucide-react";
import ReactDOM from "react-dom";

interface ModalBoardProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number } | null;
  updatePosition: () => void;
}




export default function ModalBoard({
  isOpen,
  onClose,
  workspaceId,
  position,
  updatePosition,
}: ModalBoardProps) {
  const { createBoard } = useWorkspace();
  const [boardName, setBoardName] = useState<string>("");// Color por defecto
  const [color, setColor] = useState<string>("bg-blue-500"); // Color por defecto

  const addBoard = () => {
      
    if (boardName.trim() !== '') createBoard(workspaceId, boardName, color);  // Incluye el color seleccionado 
    onClose();
    setBoardName(""); // Reinicia el color seleccionado
  };
  
  useEffect(() => {
    if (isOpen) {
      // Escucha el evento resize y actualiza la posición del modal
      window.addEventListener("resize", updatePosition);

      // Limpia el listener al desmontar
      return () => {
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);
  

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      id="modal-board"
      role="dialog" 
      aria-labelledby="modal-title" 
      aria-describedby="modal-description"
      aria-hidden={!isOpen ? "true" : "false"}
      className="fixed  z-50 "
      style={{
        top: position?.top  ,
        left: position?.left,
        width: "300px",
      }}
    >
      <div className="bg-white  flex flex-col justify-between rounded-lg shadow-lg p-4 text-slate-600">
        <h2 id="modal-title" className="text-lg font-bold mb-4 text-slate-600 text-center">Nuevo Tablero</h2>
        <div className="flex flex-col gap-4">
          {/* Input para el nombre del tablero */}
          <div>
            <label
              htmlFor="board-name"
              className="font-semibold text-sm block mb-1"
            >
              Título del tablero:
            </label>
            <input
              id="board-name"
              type="text"
              placeholder="Nombre del tablero"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Selector de colores */}
          <div>
            <label className="font-semibold text-sm block mb-2">
              Color de fondo:
            </label>
            <div className="grid grid-cols-3 items-center   gap-2">
              {Object.values(colors).map((colorOption) => (
                <div className={`${colorOption} w-20 h-12   rounded-md flex justify-center items-center`}>
                  <button
                    key={colorOption}
                    onClick={() =>setColor(colorOption)}
                    aria-label="Seleccionar color"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    className={`w-full h-full rounded-md cursor-pointer hover:bg-black/20 transition-colors flex  justify-center items-center ${
                      color === colorOption ? "bg-black/20" : ""
                    } `}
                  >
                  {color === colorOption && <Check className="text-white size-3"/>}
                  </button>
                </div>
                
              ))}
            </div>
          </div>
        </div>

        {/* Botones del modal */}
        <div className="flex flex-col gap-2 justify-between mt-6">
          <Button
            onClick={addBoard}
            className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all ease-in-out duration-300"
          >
            Crear 
          </Button>
          <Button
            onClick={onClose}
            className="text-zinc-500 font-medium px-4 py-2 rounded-lg hover:bg-red-500 transition-all ease-in-out duration-300"
          >
            Cancelar
          </Button>
          
        </div>
      </div>
    </div>,
    document.body
  );
}
