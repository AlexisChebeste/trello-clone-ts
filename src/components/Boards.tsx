import {useState} from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import ModalBoard from '../components/modals/ModalBoard';
import CardBoard from '../components/ui/CardBoard';
import { useWorkspace } from '../hooks/useWorkspace';

interface BoardsProps {
    idWorkspace: string;
}

export default function Boards({idWorkspace}: BoardsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {workspaces} = useWorkspace();

    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };



    return(
        <div className="size-full flex flex-col gap-4">
            <h1 className='text-2xl font-bold'>{workspace?.name }</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-stretch gap-4 ">
                {workspace?.boards.map((board) => (
                    <CardBoard key={board.id} workspace={workspace} board={board} />
                ))}
                <Button onClick={handleOpenModal} className="flex items-center justify-center gap-4 hover:bg-slate-200 w-full h-28 rounded-lg hover:shadow-md p-5 transition-shadow ease-in-out duration-300">
                    <Plus className='size-5'/>
                    <h2 className="text-lg font-semibold">Añadir Tablero</h2>
                </Button>
                
            </div>
            {workspace && (
                <ModalBoard workspaceId={workspace.id} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </div>
    )
}