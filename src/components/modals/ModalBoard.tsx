import { useEffect, useRef, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import Button from "../ui/Button";
import {colors} from "../../lib/colors";
import { Check } from "lucide-react";

interface ModalBoardProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}




export default function ModalBoard({
  isOpen,
  onClose,
  workspaceId,
  anchorRef,
}: ModalBoardProps) {
  const { createBoard } = useWorkspace();
  const [boardName, setBoardName] = useState<string>("");// Color por defecto
  const [color, setColor] = useState<string>("bg-blue-500"); // Color por defecto
  const modalRef = useRef<HTMLDivElement>(null);

  const addBoard = () => {
      
    if (boardName.trim() !== '') createBoard(workspaceId, boardName, color);  // Incluye el color seleccionado 
    onClose();
    setBoardName(""); // Reinicia el color seleccionado
  };
  // Calcular la posición del modal según el botón
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const updatePosition = () => {
    if (isOpen && anchorRef.current) {
      const buttonRect = anchorRef.current.getBoundingClientRect();
      const modalWidth = modalRef.current?.offsetWidth || 0;
      const modalHeight = modalRef.current?.offsetHeight || 0;

      let left = buttonRect.right + 8; // Modal a la derecha del botón
      let top = buttonRect.top;

      // Si el modal se sale por la derecha, moverlo a la izquierda del botón
      if (left + modalWidth > window.innerWidth) {
        left = buttonRect.left - modalWidth - 8; // Modal a la izquierda
      }

      // Si se sale por el borde superior o inferior, ajustamos la posición
      if (top + modalHeight > window.innerHeight) {
        top = Math.max(8, window.innerHeight - modalHeight - 8); // Ajustar hacia arriba
      } else if (top < 0) {
        top = 8; // Ajustar hacia abajo
      }

      setPosition({ top, left });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition); // Recalcular en resize
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="modal-board"
      className=" w-80 flex items-center justify-center "
      ref={modalRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 50,
      }}
    >
      <div className="bg-white  flex flex-col justify-between rounded-lg shadow-lg p-4 text-slate-600">
        <h2 className="text-xl font-bold mb-4 text-slate-600 text-center">Nuevo Tablero</h2>
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
    </div>
  );
}
