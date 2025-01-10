import {useState} from 'react';
import Button from '../Button';
import { Plus} from 'lucide-react';
import CardWorkspace from './CardWorkspace';
import  {useWorkspace}  from '../../hooks/useWorkspace';

interface AsideWorkspaceProps {
    className?: string;
}

export default function AsideWorkspace({className}: AsideWorkspaceProps) {

    const {workspaces, createWorkspace} = useWorkspace();
    const [workspaceName, setWorkspaceName] = useState<string>('');

    const createWorkspaceSubmit = () => {
        createWorkspace(workspaceName);
        setWorkspaceName('');
    }

    return(
        <div className={`p-2 lg:p-4 bg-white sm:bg-transparent flex flex-col   w-full max-w-72 sm:max-w-56  lg:max-w-64  transition-all ease-in-out ${className}`}>
            <div className='flex w-full gap-4 sm:justify-between flex-col text-start border-b pb-8'>
                <h2 className="text-lg font-semibold mt-8  sm:my-auto text-gray-700 ">Espacios de trabajo</h2>
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
                {workspaces.map((workspace) => {
                    return(
                        <CardWorkspace 
                            key={workspace.id} 
                            id={workspace.id}
                            logo={workspace.logo || ''}
                            name={workspace.name} 
                        />
                    )
                })}
            </div>
        </div>
    );
}