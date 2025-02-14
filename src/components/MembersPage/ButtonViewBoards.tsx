import { useRef, useState } from "react";
import ButtonWorkspace from "../ButtonWorkspace";
import { IBoard } from "../../types";
import ModalGeneric from "../modals/ModalGeneric";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router";

interface IButtonViewBoards {
    boardsMember: string[];
    name: string;
    memberId: string;
    onClick: (userId: string, boardId: string) => void;
}

export default function ButtonViewBoards({boardsMember, name, onClick, memberId}: IButtonViewBoards) {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const [openModal, setOpenModal] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const {user} = useSelector((store: RootState) => store.auth);

    const isUser = user?.id === memberId;

    if(!workspace) return <div>Workspace not found</div>

    const boards = workspace.boards.filter((board: IBoard) => boardsMember.includes(board.id));

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    

    return(
        <>
            <ButtonWorkspace 
                ref={buttonRef}
                className=" px-4 relative"
                onClick={handleOpenModal}
            >
                Tableros ({boards.length})
            </ButtonWorkspace>
            <ModalGeneric 
                isOpen={openModal} 
                onClose={handleCloseModal} 
                buttonRef={buttonRef} 
                height={200} 
            >
                <div className="py-1 px-3 relative flex flex-col items-center gap-3">
                    <h3 className="text-slate-800 font-semibold text-sm text-center">Tableros del Espacio de trabajo</h3>
                    <button onClick={handleCloseModal} className="absolute top-1 right-2 hover:bg-slate-200 p-1 rounded-full">
                        <X className="size-4"/>
                    </button>
                    <p className="text-sm">{name} es miembro de los siguientes tableros del Espacio de trabajo:</p>
                    <div className="flex flex-col gap-2 w-full">
                        {boards.map((board) =>
                            <div className="w-full flex justify-between items-center gap-2" key={board.id}>
                                <div className="flex gap-2 items-center">
                                    <img src={board.color} alt={board.name} className="w-10 h-8 rounded-md object-cover"/>
                                    <span className="text-sm">{board.name}</span>
                                </div>
                                {!isUser && (
                                    <button 
                                        className="text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-md px-3 py-1 " 
                                        onClick={() => onClick(memberId, board.id)}
                                    >
                                    Quitar
                                    </button>
                                )}
                                
                            </div>
                        )}
                    </div>
                </div>
            </ModalGeneric>
        </>
    )
}