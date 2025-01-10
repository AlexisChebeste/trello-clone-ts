import {useRef, useState} from 'react';
import ModalBoard from '../modals/ModalBoard';
import CardBoard from '../Home/CardBoard';
import { useWorkspace } from '../../hooks/useWorkspace';
import { UserRound } from 'lucide-react';
import { useParams } from 'react-router';
import { WorkspaceInfo } from './WorkspaceInfo';

export default function Boards() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {workspaces} = useWorkspace();

    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    const buttonRef = useRef<HTMLButtonElement>(null); 

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
        
    };

    return(
        <div className="w-full flex flex-col gap-8">
            {workspace &&
                <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}/>
            }
            
            <article className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <UserRound className='size-6 text-slate-500'/>
                    <h2 className='text-slate-800 font-semibold'>Tus tableros</h2>
                </div>
                
                <div className="relative w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-items-stretch gap-2 lg:gap-4 ">
                    {workspace?.boards.map((board) => (
                        <CardBoard key={board.id} board={board} />
                    ))}
                    <button 
                        ref={buttonRef}
                        onClick={handleOpenModal} 
                        aria-label='Añadir nuevo tablero'
                        className='flex h-24 items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 w-full  p-5 transition-all rounded ease-in-out duration-300 border hover:border-gray-400 hover:scale-105 hover:shadow-none'
                    >
                        <h2 className="text-lg text-gray-700 font-semibold">Añadir tablero</h2>
                    </button>
                    
                </div>
                
            </article>
            {workspace && (
                <ModalBoard
                workspaceId={workspace.id}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                buttonRef={buttonRef}
                aria-labelledby="modal-title" // Asociar el modal con un título
                aria-hidden={!isModalOpen ? "true" : "false"} // Asegúrate de que el contenido detrás del modal esté oculto
                />
            )}
            
        </div>
    )
}