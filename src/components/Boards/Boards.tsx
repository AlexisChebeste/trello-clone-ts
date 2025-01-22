import {useRef, useState} from 'react';
import ModalBoard from '../modals/AddBoard/ModalBoard';
import CardBoard from '../Home/CardBoard';
import { UserRound } from 'lucide-react';
import { useParams } from 'react-router';
import { WorkspaceInfo } from './WorkspaceInfo';
import Addbutton from './Addbutton';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';

export default function Boards() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const workspaces = useSelector((store: AppStore) => store.workspace.workspaces);
    let workspace;
    if(idWorkspace === ':idWorkspace'){ 
       
        workspace = workspaces[0]
    
    } else {
        workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    }

    const buttonRef = useRef<HTMLButtonElement>(null); 

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
        
    };

    if(!workspace) {
        return <div>El espacio de trabajo no existe</div>
    }

    return(
        <div className="w-full flex flex-col gap-8">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description} isPublic={workspace.isPublic}/>
            
            
            <article className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <UserRound className='size-6 text-slate-500'/>
                    <h2 className='text-slate-800 font-semibold'>Tus tableros</h2>
                </div>
                
                <div className="relative w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-items-stretch gap-2 lg:gap-4 ">
                    {workspace.boards.map((board) => (
                        <CardBoard key={board.id} board={board} />
                    ))}
                    <Addbutton buttonRef={buttonRef} onClick={handleOpenModal} remaining={workspace.boards.length}/>
                    
                </div>
                
            </article>
            <ModalBoard
                workspaceId={workspace.id}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                buttonRef={buttonRef}
                aria-labelledby="modal-title" // Asociar el modal con un título
                aria-hidden={!isModalOpen ? "true" : "false"} // Asegúrate de que el contenido detrás del modal esté oculto
            />
            
        </div>
    )
}