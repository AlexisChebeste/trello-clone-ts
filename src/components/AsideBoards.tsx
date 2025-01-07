import {useState} from 'react';
import {  Plus} from 'lucide-react';
import  {useWorkspace}  from '../hooks/useWorkspace';
import CardBoardAside from './ui/CardBoardAside';
import Sidebar from './Siderbar';
import ModalBoard from './modals/ModalBoard';
import { useParams } from 'react-router';
import { useColor } from '../hooks/useColor';
interface AsideBoardsProps {
    setIdBoard: (id:string) => void;
}

export default function AsideBoards({setIdBoard}: AsideBoardsProps) {
    const {workspaceId} = useParams();
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === workspaceId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {color, setColor} = useColor();
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };



    const onClick = (id: string, color:string) => {
        setIdBoard(id);
        setColor(color)
    }


    return(
        <Sidebar className={`${color || 'bg-blue-600'}`}>
            
            <div className='flex  gap-2 text-start border-b border-slate-300/60 py-5 px-4 items-center '>
                <div className={`flex  justify-center items-center h-9 w-11  rounded-md bg-indigo-500 text-white font-bold text-xl`}>E</div>
                <div className="flex flex-col   w-full ">
                    <h2 className="text-md  text-white font-semibold">{workspace?.name}</h2>
                    <p className='text-white text-xs '>Grautita</p>
                </div>
            </div>
            <div >
                <div className="flex gap-3 flex-col w-auto pt-4 pb-2 ">
                    <div className='flex justify-between items-center px-4'>
                        <h3 className='text-sm font-bold  text-white'>Sus tableros</h3>
                        <button onClick={handleOpenModal} 
                        className=' p-1 text-white hover:bg-white/30 rounded-md '>
                            <Plus className='size-4 '/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {workspaces && workspace?.boards.map((board) => {
                        return(
                            <CardBoardAside 
                                key={board.id} 
                                name={board.name}
                                color={board.color || 'bg-blue-500'}
                                onClick={()=> onClick(board.id, ( board.color || 'bg-indigo-500'))}
                            />
                        )
                    })}
                </div>
            </div>
            
            {workspace && (
                <ModalBoard workspaceId={workspace.id} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
             
        </Sidebar> 
        
        
        
        
    );
}

