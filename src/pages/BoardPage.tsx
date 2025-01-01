import { useParams } from 'react-router';
import {useState} from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import ModalBoard from '../components/modals/ModalBoard';
import CardBoard from '../components/ui/CardBoard';

export default function BoardPage() {
    const { id } = useParams<{ id: string}>();
    const { workspaces } = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };



    return(
        <div className="pt-6 h-full max-h-max">
            <h1 className='ml-6 text-2xl font-bold'>{workspace?.name }</h1>
            <div className="flex overflow-x-auto min-h-[calc(100vh-7.6rem)]">
                {workspace?.boards.map((board)  => (
                    <CardBoard key={board.id} board={board} />
                ))}
                <Button onClick={handleOpenModal} className="flex items-center justify-center gap-4 hover:bg-slate-200 min-w-80 h-full rounded-lg hover:shadow-md p-5 m-4 transition-shadow ease-in-out duration-300">
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