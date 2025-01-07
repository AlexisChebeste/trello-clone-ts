import { useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import Button from "../ui/Button";

interface ModalBoardProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  "bg-[#0078bd]",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-yellow-500",
];


export default function ModalBoard({
  isOpen,
  onClose,
  workspaceId,
}: ModalBoardProps) {
  const { createBoard } = useWorkspace();
  const [boardName, setBoardName] = useState<string>("");// Color por defecto
  const [color, setColor] = useState<string>("bg-blue-500"); // Color por defecto


  const addBoard = () => {
    createBoard(workspaceId, boardName, color);  // Incluye el color seleccionado 
    onClose();
    setBoardName(""); // Reinicia el color seleccionado
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="modal-board"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white w-96 flex flex-col justify-between rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Tablero</h2>
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
            <div className="flex gap-2">
              {COLORS.map((colorOption) => (
                <button
                  key={colorOption}
                  onClick={() =>setColor(colorOption)}
                  className={`w-10 h-10 rounded-full cursor-pointer ${colorOption} ${
                    color === colorOption ? "ring-4 ring-offset-2 ring-gray-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Botones del modal */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={onClose}
            className="text-zinc-500 font-medium px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all ease-in-out duration-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={addBoard}
            className="bg-zinc-900 text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition-all ease-in-out duration-300"
          >
            Crear Tablero
          </Button>
        </div>
      </div>
    </div>
  );
}
