import {useState} from 'react';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';
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
        <div className={`hidden p-6 bg-white lg:flex flex-col rounded-lg shadow-md ${className} max-w-72 w-full`}>
            <div className='flex w-full gap-4 sm:justify-between flex-col items-center'>
                <h1 className="text-2xl font-bold  my-auto">Espacios de trabajo</h1>
                <div className="flex gap-3 items-center  flex-col w-full ">
                    <input 
                        type="text" 
                        placeholder='Nombre de espacio de trabajo' 
                        value={workspaceName}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        className='w-full p-3 border border-gray-200 rounded-lg focus:outline-zinc-700 focus:outline-none '    
                    />
                    <Button onClick={createWorkspaceSubmit}
                        className='w-full bg-zinc-800  px-3 text-white hover:bg-zinc-700 flex items-center justify-center gap-2 '>
                        <Plus className='size-4'/>
                        Crear
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6">
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