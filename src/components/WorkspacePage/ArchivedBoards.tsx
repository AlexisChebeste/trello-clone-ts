import { useState } from "react";
import { IBoard } from "../../types";
import ButtonWorkspace from "../ButtonWorkspace";
import ModalArchived from "./ModalArchived";

interface ArchivedBoardsProps {
    boardsArchived: IBoard[];
    nameWorkspace: string;
}


export default function ArchivedBoards({boardsArchived,nameWorkspace}: ArchivedBoardsProps) {
    const [isArchivedModalOpen, setIsArchivedModalOpen] = useState(false);
    const handleModalArchived = () => {
        setIsArchivedModalOpen(!isArchivedModalOpen);
      }

    return(
        <div className={`w-full flex justify-center ${boardsArchived.length === 0   ? 'hidden' : 'block'}`}>
          <ButtonWorkspace 
            className="mt-4"
            onClick={handleModalArchived}
          >
            Ver los tableros cerrados
          </ButtonWorkspace>
          <ModalArchived isModalOpen={isArchivedModalOpen} setIsModalOpen={setIsArchivedModalOpen} boardsArchived={boardsArchived} workName={nameWorkspace}/>
        </div>
    )
}