import {useState} from 'react';
import ModalBoard from '../components/modals/ModalBoard';
import CardBoard from '../components/ui/CardBoard';
import { useWorkspace } from '../hooks/useWorkspace';
import ButtonAdd from './ui/ButtonAdd';
import { FolderLock, UserRound } from 'lucide-react';

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
        <div className="size-full flex flex-col gap-8">
            <div className='flex gap-4 items-center border-b pb-8 border-b-slate-300'>
                <div className='py-3 px-6 bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 rounded-lg text-white font-bold text-4xl'>E</div>
                <div className='flex flex-col text-gray-700 gap-1'>
                    <h1 className='text-xl font-semibold'>{workspace?.name }</h1>
                    <p className='text-gray-500 text-xs flex gap-1 items-center'><FolderLock className='size-4'/>Publica</p>
                </div>
            </div>
            
            <article className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <UserRound className='size-6 text-slate-500'/>
                    <h3 className='text-slate-800 font-semibold'>Tus tableros</h3>
                </div>
                
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 justify-items-stretch gap-4 ">
                    {workspace?.boards.map((board) => (
                        <CardBoard key={board.id} workspace={workspace} board={board} />
                    ))}
                    <ButtonAdd 
                        className='h-28 !rounded-lg hover:scale-105 hover:shadow-none  ' 
                        onClick={handleOpenModal} 
                        title='tablero'
                    />
                    
                </div>
                {workspace && (
                    <ModalBoard workspaceId={workspace.id} isOpen={isModalOpen} onClose={handleCloseModal} />
                )}
            </article>
            
        </div>
    )
}