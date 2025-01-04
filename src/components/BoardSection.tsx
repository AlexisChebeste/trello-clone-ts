import { useParams } from "react-router";
import ModalList from "./modals/ModalList";
import ButtonAdd from "./ui/ButtonAdd";
import CardList from "./ui/CardList";
import { useWorkspace } from "../hooks/useWorkspace";
import { useState } from "react";
import { Plus } from "lucide-react";

interface BoardSectionProps {
    idBoard: string;
}

export default function BoardSection({idBoard}: BoardSectionProps) {
    const {workspaces} = useWorkspace(); 
    const {workspaceId, } = useParams<{ workspaceId: string, id: string}>();
    
    const workspaceSelected = workspaces?.find((workspace) => workspace.id === workspaceId);

    const board = workspaceSelected?.boards.find((board) => board.id === idBoard);
        
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const style = 'bg-gradient-to-br from-blue-aside to-blue-900'
    
    

    return(
        <div className={`w-full flex flex-col gap-4 ${style} min-h-[calc(100vh-4rem)] `}>
                <div className={`flex py-4 gap-4 items-center justify-between pl-6 backdrop-blur-xl bg-black/20 shadow-sm ` }>
                    <h2 className='text-xl font-bold text-white'>{board?.name }</h2>
                    
                </div>
                
                <div className="flex gap-4 overflow-x-auto min-h-[calc(100vh-8.8rem)] ">
                    {board?.lists.map((list)  => (
                        <CardList key={list.id} list={list} />
                    ))}
                    <ButtonAdd 
                        className='bg-white/30 bg-opacity-80 min-w-80 max-w-96 w-full border-none text-white h-14 hover:text-blue-950'
                        onClick={handleOpenModal} 
                        title='lista' 
                    >
                        
                        <Plus className='size-5'/>
                    </ButtonAdd>
                </div>
                {board && idBoard && ( 
                    <ModalList boardId={idBoard} isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
            </div>
    )
}