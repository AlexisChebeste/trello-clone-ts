import {useState} from 'react';
import {  ChevronLeft, ChevronRight, Plus} from 'lucide-react';
import  {useWorkspace}  from '../hooks/useWorkspace';
import CardBoardAside from './ui/CardBoardAside';

interface AsideBoardsProps {
    className?: string;
    idWorkspace: string;
    setIdBoard: (id:string) => void;
}

export default function AsideBoards({className,setIdBoard, idWorkspace}: AsideBoardsProps) {

    const {workspaces, createBoard} = useWorkspace();
    const [boardName, setboardName] = useState<string>('test');
    const [asideOpen, setAsideOpen] = useState(true);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);



    const createBoardSubmit = () => {
        createBoard(idWorkspace, boardName);
        setboardName('');
    }

    const handleToggleAside = () => {
        setAsideOpen((prev) => !prev);
      };

    const onClick = (id: string) => {
        setIdBoard(id);
    }


    return(
        <aside className={` max-w-64    ${asideOpen ? 'w-full' : 'w-8 '}  ${className} border-r border-slate-300/60 transition-all ease-in-out duration-300` } >
            {asideOpen &&
            <div className={`relative flex flex-col  gap-4  
        w-full transition-all ease-in-out duration-300 text-white ` }>
                <div className='flex w-full gap-2 text-start border-b border-slate-300/60 py-4 px-3 items-center'>
                    <div className='flex justify-center items-center h-8 w-10 bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 rounded-md text-white font-bold text-xl'>E</div>
                    <div className="flex flex-col text-start w-full">
                        <h2 className="text-md  text-white font-semibold">Espacio de trabajo 1</h2>
                        <p className='text-white text-xs flex gap-1 items-center'>Grautita</p>
                    </div>
                    <button
                        onClick={handleToggleAside}
                        className={` hover:bg-white/30 rounded-md p-1`}
                    >
                        <ChevronLeft className="size-5" />
                    </button>
                </div>
                <div >
                    <div className="flex gap-3 flex-col w-auto py-2 px-2">
                        <div className='flex justify-between items-center'>
                            <h3 className='text-sm font-bold ml-2'>Sus tableros</h3>
                            <button onClick={createBoardSubmit} 
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
                                    onClick={()=> onClick(board.id)}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
            }
            
                <button onClick={handleToggleAside} className={`relative  h-full w-full hover:bg-blue-700 transition-transform ease-in-out duration-500  group text-white font-bold text-xl  ${asideOpen? '-translate-x-full' : 'translate-x-0'} z-10`}>
                    <div
                    className={`absolute top-5 left-4 z-50 bg-blue-700 rounded-full border group-hover:bg-blue-800 border-slate-400 p-1`}
                    >
                        <ChevronRight className="size-5" />
                    </div>
                </button>
                
            
        </aside>
        
        
        
    );
}

