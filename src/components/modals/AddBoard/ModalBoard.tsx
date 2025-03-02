import { useState } from "react";
import ModalBoardColorSelector from "./ModalBoardColorSelector";
import ModalBoardButtons from "./ModalBoardButtons";
import { colors, gradients } from "../../../lib/colors";
import ModalFlex from "../ModalGeneric";
import { useDispatch } from "react-redux";
import { createBoard } from "../../../redux/states/boardsSlice";
import { AppDispatch } from "../../../redux/store";

interface ModalBoardProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function ModalBoard({
  isOpen,
  onClose,
  workspaceId,
  buttonRef,
}: ModalBoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [boardName, setBoardName] = useState<string>("");// Color por defecto
  const [color, setColor] = useState<string>("bg-blue-500"); // Color por defecto

  const addBoard = () => {
      
    if (boardName.trim() !== "") {
      // Dispatch de la acción para agregar el board
      dispatch(
        createBoard({
          name: boardName,
          idWorkspace: workspaceId,
          color,
          isPublic: false, 
        })
      );
      onClose();
      setBoardName(""); // Reiniciar el nombre
    }
  };


  if (!isOpen) {
    return null;
  }

  return (
    <ModalFlex buttonRef={buttonRef} onClose={onClose} height={700} isOpen={isOpen} className="p-4" leftAdd={40}>
      <h2 id="modal-title" className="text-lg font-bold mb-4 text-slate-600 text-center">Nuevo Tablero</h2>
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

      {/* Selector de color */}
      <label className="font-semibold my-1 text-sm block ">
            Color de fondo:
      </label>
      <div className="flex flex-col  gap-6">
        
        <ModalBoardColorSelector setColor={setColor} color={color} listColor={colors}/>
        <div className="w-full border-b border-slate-300" />
        <ModalBoardColorSelector setColor={setColor} color={color} listColor={gradients}/>    
      </div>
       

      {/* Botones del modal */}
      <ModalBoardButtons addBoard={addBoard} onClose={onClose} />
    </ModalFlex>
  );
}
