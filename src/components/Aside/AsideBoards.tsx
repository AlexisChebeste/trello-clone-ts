import {useState, useRef, useEffect} from 'react';
import { Plus, Trello, UserRound} from 'lucide-react';
import CardBoardAside from './CardBoardAside';
import Sidebar from './Siderbar';
import ModalBoard from '../modals/AddBoard/ModalBoard';
import WorkspaceLink from './WorkspaceLink';
import { ModalAccount } from './ModalAccount';
import {IBoard } from '../../types';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { archivedBoard } from '../../redux/states/workspaceSlices';

interface AsideBoardsProps {
  idWorkspace: string;
  className?: string;
}

export default function AsideBoards({idWorkspace, className}: AsideBoardsProps) {
    const workspaces = useSelector((store: AppStore) => store.workspace.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null); 
    const [boards, setBoards] = useState<IBoard[] | []>([]);
    const dispatch = useDispatch()
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
    const isBoardPage = location.pathname.includes("b/");
    const handleArchiveBoard = (boardId: string) => {
      dispatch(archivedBoard({boardId: boardId}))
    };
  
    useEffect(() => {
      if (workspace) setBoards(workspace.boards.filter(board => board.isArchived === false));
    }, [workspace?.boards]);


    return(
      <Sidebar className={`backdrop-blur-md  ${className}`}>
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
              <div className='flex w-full'>
                <WorkspaceLink idWorkspace={idWorkspace} title='Tableros'>
                  <Trello className="size-4"/>
                </WorkspaceLink>
              </div>
              <div className='flex w-full'>
                <WorkspaceLink idWorkspace={idWorkspace} dir='/members' title='Miembros'>
                  <UserRound className="size-4"/>
                </WorkspaceLink>
              </div>
              <ModalAccount idWorkspace={idWorkspace}/>
        </div>
        <div className="flex flex-col w-auto  pb-2 ">
          <div className='  flex justify-between items-center pl-4 '>
            <h3 className='text-sm font-bold  '>Sus tableros</h3>
            <button 
              ref={buttonRef}
              onClick={handleOpenModal} 
              aria-label='Crear tablero'
              aria-labelledby='Crear tablero'
              
              className={`p-1  ${isBoardPage ? 'hover:bg-white/30' : 'hover:bg-slate-200'} rounded-md mr-3`}
            >
              <Plus className='size-4 '/>
            </button >
            
          </div>
          
          <div className="flex flex-col">
            {boards.filter((board) => !board.isArchived).map((board) => (
              
                <CardBoardAside 
                  key={board.id} 
                  board={board}
                  onArchive={() => handleArchiveBoard(board.id)}
                />
              )
            )}
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

