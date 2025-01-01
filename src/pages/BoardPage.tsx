import { useParams } from 'react-router';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import { Workspace } from '../types';
import { useWorkspace } from '../hooks/useWorkspace';

interface BoardPageProps {
    workspace: Workspace[] | undefined;
}

export default function BoardPage({workspace}: BoardPageProps) {
    const { workspaceId, id } = useParams<{ workspaceId:string, id: string}>();
    const workspaceSelected = workspace?.find((workspace) => workspace.id === workspaceId);

    const board = workspaceSelected?.boards.find((board) => board.id === id);
    const {createList} = useWorkspace(); 
    /* const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
 */
    const handleCreateList = () => {
        if(!board) return;
        createList(board.id, 'Nueva lista');
    }


    return(
        <div className="pt-6 h-full max-h-max">
            <h1 className='ml-6 text-2xl font-bold'>{board?.name }</h1>
            <div className="flex overflow-x-auto min-h-[calc(100vh-7.6rem)]">
                {board?.lists.map((list)  => (
                    <div className='flex flex-col items-start gap-4 p-4' key={list.id}>
                        <h2 className='text-xl font-semibold'>{list.title}</h2>
                        
                    </div>
                ))}
                <Button onClick={handleCreateList} className="flex items-center justify-center gap-4 hover:bg-slate-200 min-w-80 h-full rounded-lg hover:shadow-md p-5 m-4 transition-shadow ease-in-out duration-300">
                    <Plus className='size-5'/>
                    <h2 className="text-lg font-semibold">Añadir Tablero</h2>
                </Button>
                
            </div>
        </div>
    )
}