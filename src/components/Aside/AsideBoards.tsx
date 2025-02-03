import {useState, useRef, useEffect} from 'react';
import { Plus, Trello, UserRound} from 'lucide-react';
import CardBoardAside from './CardBoardAside';
import Sidebar from './Siderbar';
import ModalBoard from '../modals/AddBoard/ModalBoard';
import WorkspaceLink from './WorkspaceLink';
import { ModalAccount } from './ModalAccount';
import { useDispatch } from 'react-redux';
import { archivedBoard } from '../../redux/states/workspaceSlices';
import { AppDispatch, RootState} from '../../redux/store';
import { fetchWorkspaceById } from '../../redux/states/workspacesSlices';
import { useSelector } from 'react-redux';
import { useBoards } from '../../hooks/useBoards';

interface AsideBoardsProps {
  idWorkspace: string;
  className?: string;
}

export default function AsideBoards({idWorkspace, className}: AsideBoardsProps) {
   const dispatch = useDispatch<AppDispatch>()
   const {selectedWorkspace} = useSelector((store: RootState)=> store.workspaces)
    useEffect(() => {
      dispatch(fetchWorkspaceById(idWorkspace));
    }, [dispatch, idWorkspace]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null); 
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
  
    const {
      filteredBoards
    } = useBoards(idWorkspace);


    if (!selectedWorkspace) return null;

    return(
      <Sidebar className={`backdrop-blur-md  ${className}`}>
        <div className='flex  gap-2 border-b border-slate-300/30 py-5 px-4 items-center w-full'>
          <div className={`flex  justify-center items-center h-10 w-12  rounded-md  text-white font-bold text-xl relative`}>
            <img src={`/public${selectedWorkspace.logo}`} alt={`${selectedWorkspace.name} logo`}  className='size-full rounded-md'/>
            <span className='absolute inset-0 flex items-center justify-center'>{selectedWorkspace.name[0].toUpperCase()}</span>
          </div>
          <div className="flex flex-col   w-full ">
            <h2 className="text-md   font-semibold">{selectedWorkspace?.name}</h2>
            <p className=' text-xs '>{selectedWorkspace.plan.toUpperCase()}</p>
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
            <ModalBoard
              workspaceId={selectedWorkspace.id}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              buttonRef={buttonRef}
            />
          </div>
          
          <div className="flex flex-col">
            {filteredBoards.map((board) => (
              
                <CardBoardAside 
                  key={board.id} 
                  board={board}
                  onArchive={() => handleArchiveBoard(board.id)}
                />
              )
            )}
          </div>
        </div>
          
          
            
      </Sidebar>   
    );
}

