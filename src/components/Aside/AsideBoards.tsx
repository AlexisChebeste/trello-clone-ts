import {useState, useRef, useEffect} from 'react';
import { Plus} from 'lucide-react';
import CardBoardAside from './BoardSection/CardBoardAside';
import Sidebar from './Siderbar';
import ModalBoard from '../modals/AddBoard/ModalBoard';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState} from '../../redux/store';
import { fetchWorkspaceById } from '../../redux/states/workspacesSlices';
import { useSelector } from 'react-redux';
import { useBoards } from '../../hooks/useBoards';
import AsideHeader from './HeaderSection/AsideHeader';
import SoliciteInvitation from './SoliciteInvitation';
import { fetchUserProfile } from '../../redux/states/authSlice';

interface AsideBoardsProps {
  idWorkspace: string;
  className?: string;
}

export default function AsideBoards({idWorkspace, className}: AsideBoardsProps) {
   const dispatch = useDispatch<AppDispatch>()
   const {selectedWorkspace} = useSelector((store: RootState)=> store.workspaces)
   const {user} = useSelector((store: RootState) => store.auth);

    useEffect(() => {
      dispatch(fetchWorkspaceById(idWorkspace));
      dispatch(fetchUserProfile());
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
  
    const {
      filteredBoards
    } = useBoards(idWorkspace);


    if (!selectedWorkspace) return null;

    const userInWorkspace = selectedWorkspace.members.some((u) => u.id === user?.id);

    return(
      <Sidebar className={`backdrop-blur-md  ${className}`}>
        <AsideHeader 
          idWorkspace={idWorkspace} 
          selectedWorkspace={selectedWorkspace} 
          userInWorkspace={userInWorkspace}
        />

        {/*Tableros*/}

        <div className="flex flex-col w-auto  py-3 ">
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
                />
              )
            )}
          </div>
        </div>
        {!userInWorkspace && (
          <SoliciteInvitation usersInvitations={selectedWorkspace.invitations} />
        )} 
          
            
      </Sidebar>   
    );
}

