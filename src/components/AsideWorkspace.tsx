import {useState} from 'react';
import Button from '../components/ui/Button';
import { Plus} from 'lucide-react';
import CardWorkspace from '../components/ui/CardWorkspace';
import  {useWorkspace}  from '../hooks/useWorkspace';

interface AsideWorkspaceProps {
    className?: string;
    setIdWorkspace: (id: string) => void;
}

export default function AsideWorkspace({className,setIdWorkspace}: AsideWorkspaceProps) {

    const {workspaces, createWorkspace} = useWorkspace();
    const [workspaceName, setWorkspaceName] = useState<string>('');

    const createWorkspaceSubmit = () => {
        createWorkspace(workspaceName);
        setWorkspaceName('');
    }

    const onClick = (id: string) => {
        setIdWorkspace(id);
    }

    return(
        <div className={`p-4 bg-white md:bg-transparent flex flex-col    w-full max-w-80  md:max-w-64 lg:max-w-72 transition-all ease-in-out ${className}`}>
            <div className='flex w-full gap-4 sm:justify-between flex-col text-start border-b pb-8'>
                <h2 className="text-lg font-semibold mt-8  md:my-auto text-gray-700 ">Espacios de trabajo</h2>
                <div className="flex gap-3 flex-col w-auto ">
                    <input 
                        type="text" 
                        placeholder='Nombre de espacio de trabajo' 
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className=' p-2 border border-gray-200 rounded-lg focus:border-zinc-600  focus:outline-none placeholder:text-sm'    
                    />
                    <Button onClick={createWorkspaceSubmit}
                        className=' bg-zinc-800  px-3 text-white hover:bg-zinc-700 flex items-center justify-center gap-2 text-sm'>
                        <Plus className='size-4 '/>
                        Crear
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8">
                {workspaces && workspaces.map((workspace) => {
                    return(
                        <CardWorkspace 
                            key={workspace.id} 
                            name={workspace.name} 
                            cantBoards={workspace.boards.length}
                            onClick={() => onClick(workspace.id)}
                        />
                    )
                })}
            </div>
        </div>
    );
}