import { useParams } from 'react-router';
import { Plus } from 'lucide-react';
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
        <div className="flex overflow-hidden  h-full min-h-[calc(100vh-4rem)]">
            <aside className='bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 min-w-64 w-full'>
                <h2>hola</h2>
            </aside>
            <div className='pt-2 h-full w-full flex flex-col gap-4 bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 min-h-[calc(100vh-4rem)] '>
                <h2 className='text-2xl font-bold text-gray-700'>{board?.name }</h2>
                <div className="flex gap-4 overflow-x-auto min-h-[calc(100vh-7.5rem)]">
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
                {board && id && ( 
                    <ModalList boardId={id} isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
            </div>
        </div>
    )
}