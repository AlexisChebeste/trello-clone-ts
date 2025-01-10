import Button from "../Button";

interface ModalBoardButtonsProps {
    addBoard: () => void;
    onClose: () => void;
}


export default function ModalBoardButtons({addBoard, onClose}:ModalBoardButtonsProps ) {
    return(
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
    )
}