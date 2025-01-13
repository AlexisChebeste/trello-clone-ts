import {useState, useRef} from 'react';
import { Plus} from 'lucide-react';
import  {useWorkspace}  from '../../hooks/useWorkspace';
import CardBoardAside from './CardBoardAside';
import Sidebar from './Siderbar';
import ModalBoard from '../modals/ModalBoard';
import { useColor } from '../../hooks/useColor';
import WorkspaceLink from './WorkspaceLink';

interface AsideBoardsProps {
  idWorkspace: string;
  className?: string;
}

export default function AsideBoards({idWorkspace, className}: AsideBoardsProps) {
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setColor} = useColor();
    const buttonRef = useRef<HTMLButtonElement>(null); 

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
    const isBoardPage = location.pathname.includes("b/");

    return(
      <Sidebar className={`backdrop-blur-md z-50 ${className}`}>
        <div className='flex  gap-2 border-b border-slate-300/30 py-5 px-4 items-center w-full'>
          <div className={`flex  justify-center items-center h-9 w-11  rounded-md ${workspace?.logo} text-white font-bold text-xl`}>
            {workspace?.name[0].toUpperCase()}
          </div>
          <div className="flex flex-col   w-full ">
            <h2 className="text-md   font-semibold">{workspace?.name}</h2>
            <p className=' text-xs '>Grautita</p>
          </div>
        </div>
        <div className='flex flex-col  py-3'>
            <ul className='flex flex-col '>
              <li className='flex w-full'>
                <WorkspaceLink idWorkspace={idWorkspace} title='Tableros'/>
              </li>
              <li className='flex w-full'>
                <WorkspaceLink idWorkspace={idWorkspace} dir='/members' title='Miembros'/>
              </li>
              <li className='flex w-full'>
                <WorkspaceLink idWorkspace={idWorkspace} dir='/account' title='Ajustes del Espacio de trabajo'/>
              </li>
            </ul>
        </div>
        <div className="flex flex-col w-auto  pb-2 ">
          <div className='  flex justify-between items-center pl-4'>
            <h3 className='text-sm font-bold  '>Sus tableros</h3>
            <button 
              ref={buttonRef}
              onClick={handleOpenModal} 
              aria-label='Crear tablero'
              aria-labelledby='Crear tablero'
              
              className={`p-1  ${isBoardPage ? 'hover:bg-white/30' : 'hover:bg-slate-200'} rounded-md mr-3`}
            >
              <Plus className='size-4 '/>
            </button>
          </div>
          
          <div className="flex flex-col">
            {workspaces && workspace?.boards.map((board) => {
              return(
                <CardBoardAside 
                  key={board.id} 
                  id={board.id}
                  name={board.name}
                  color={board.color || 'bg-blue-500'}
                  onClick={() => setColor(board.color || 'bg-blue-500')}
                />
              )
            })}
          </div>
        </div>
        {workspace && (
          <ModalBoard
            workspaceId={workspace.id}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            buttonRef={buttonRef}
          />
        )}
          
            
      </Sidebar>   
    );
}

