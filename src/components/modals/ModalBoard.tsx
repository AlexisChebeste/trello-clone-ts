import { useEffect, useState } from "react";
import { useWorkspace } from "../../hooks/useWorkspace";
import ReactDOM from "react-dom";
import ModalBoardColorSelector from "./ModalBoardColorSelector";
import ModalBoardButtons from "./ModalBoardButtons";
import { colors, gradients } from "../../lib/colors";

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
  const { createBoard } = useWorkspace();
  const [boardName, setBoardName] = useState<string>("");// Color por defecto
  const [color, setColor] = useState<string>("bg-blue-500"); // Color por defecto
  
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const addBoard = () => {
      
    if (boardName.trim() !== '') createBoard(workspaceId, boardName, color);  // Incluye el color seleccionado 
    onClose();
    setBoardName(""); // Reinicia el color seleccionado
  };
  
  const handleResize = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalWidth = 300;
      const modalHeight = 650;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
  
      let left = buttonRect.right;
      let top = buttonRect.top;
  
      if (left + modalWidth > screenWidth) {
        left = screenWidth - modalWidth;
      }
      if (top + modalHeight > screenHeight) {
        top = screenHeight - modalHeight ;
      }
      
      if (top < 0) {
        top = 0;
      }

      if (left < 0) {
        left = 0;
      }
  
      setModalPosition({ top, left });
    }
  };
  
  /* useEffect(() => {
    if (isOpen) {
      handleResize();
      const close = (e: { key: string; }) =>{
        if (e.key === "Escape") onClose();
      }
      // Escucha el evento resize y actualiza la posición del modal
      window.addEventListener("keydown", close);
      window.addEventListener("resize", handleResize);

      // Limpia el listener al desmontar
      return () => {
        window.removeEventListener("keydown", close);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isOpen, handleResize]); */
  

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
      className="fixed bg-white  flex flex-col justify-between rounded-lg shadow-lg p-4 border border-slate-200 gap-2 text-slate-600 z-50 "
      style={{
        top: modalPosition?.top ,
        left: modalPosition?.left ,
        width: "300px",
      }}
    >
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
    </div>,
    document.body
  );
}
