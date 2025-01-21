import { MoveUpRight, X } from "lucide-react";
import { Board } from "../../types";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { archivedBoard } from "../../redux/states/workspaceSlices";

interface ModalArchivedProps {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    boardsArchived: Board[];
    workName: string;
}

export default function ModalArchived({isModalOpen, setIsModalOpen, boardsArchived, workName}: ModalArchivedProps) {
    const dispatch = useDispatch()
    const changeArchived = (boardId: string) => {
        dispatch(archivedBoard({boardId: boardId}))
        setIsModalOpen(!isModalOpen);
    }


    return(
        <div className={`${isModalOpen ? 'fixed' : 'hidden'}  inset-0  z-50 bg-black bg-opacity-50 flex  justify-center`}>
            <div  className="bg-white p-6 translate-y-16 h-max rounded-lg w-4/5 max-w-3xl">
                <div className="flex justify-between items-center text-slate-800">
                    <h2 className="text-xl font-semibold ">Tableros cerrados</h2>
                    <button 
                        className="hover:bg-slate-200 p-2 rounded-full" 
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X />
                    </button>
                </div>
                

                
                    {boardsArchived && boardsArchived.map(board => (
                        <div key={board.id} className="mt-6 flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <div className={`w-14 h-10 rounded-sm ${board.color}`}></div>
                                <div className="flex flex-col justify-between  text-sm">
                                    <Link to={`/b/${board.id}/${board.name}`} className="text-blue-500 hover:underline flex items-center gap-2">
                                        {board.name}
                                        <MoveUpRight className="size-4 text-slate-800"/>
                                    </Link>
                                    <p>{workName}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 items-center text-white">
                                <button className="bg-blue-600 py-2 px-4 font-semibold rounded-md text-sm "
                                onClick={() => changeArchived(board.id)}>Volver a abrir</button>
                                <button className="bg-red-600 py-2 px-4 font-semibold rounded-md text-sm">Eliminar</button>
                            </div>
                        </div>
                    ))}

                    
                   
            </div>
        </div>
    )
}