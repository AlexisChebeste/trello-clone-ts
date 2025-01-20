import CardWorkspace from './CardWorkspace';
import  {useWorkspace}  from '../../hooks/useWorkspace';


export default function AsideWorkspace() {

    const {workspaces} = useWorkspace();

    return(
        <aside className='hidden h-full p-2 lg:p-4 bg-white sm:flex flex-col gap-4 w-full max-w-56  lg:max-w-64'>
            <h2 className='text-sm text-slate-500 font-medium border-b border-b-gray-300 py-4 px-2'>Espacios de trabajo</h2>
            <ul className="flex flex-col gap-4 list-none">
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
            </ul>
        </aside>
    );
}