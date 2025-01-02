import { useParams } from 'react-router';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import { useWorkspace } from '../hooks/useWorkspace';
import { useState } from 'react';
import ModalList from '../components/modals/ModalList';
import CardList from '../components/ui/CardList';
import ButtonAdd from '../components/ui/ButtonAdd';

export default function BoardPage() {
    const {workspaces} = useWorkspace(); 
    const {workspaceId, id } = useParams<{ workspaceId: string, id: string}>();
    const workspaceSelected = workspaces?.find((workspace) => workspace.id === workspaceId);

    const board = workspaceSelected?.boards.find((board) => board.id === id);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };


    return(
        <div className="pt-6 h-full max-h-max ml-6 mr-4 flex flex-col gap-4">
            <h1 className='text-2xl font-bold'>{board?.name }</h1>
            <div className="flex gap-4 overflow-x-auto min-h-[calc(100vh-8.5rem)]">
                {board?.lists.map((list)  => (
                    <CardList key={list.id} list={list} />
                ))}
                <ButtonAdd 
                    className='min-w-80 max-w-96 h-full'
                    onClick={handleOpenModal} 
                    title='lista' 
                />
            </div>
            {board && id && ( 
                <ModalList boardId={id} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
            
        </div>
    )
}