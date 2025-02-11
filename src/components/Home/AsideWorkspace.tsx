import CardWorkspace from './CardWorkspace';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export default function AsideWorkspace() {

    const { workspaces, loading, error } = useSelector((state: RootState) => state.workspaces);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const isBoard = window.location.pathname.includes('/u/');

    return(
        <aside className='hidden h-full p-2 lg:p-4 bg-white sm:flex flex-col gap-4 w-full max-w-56  lg:max-w-64'>
            
            <button className={` w-full p-2 rounded-lg ${isBoard ? 'bg-sky-100 text-blue-600' : 'text-gray-800 hover:bg-slate-200'}   cursor-pointer transition-all ease-out duration-300 h-full flex items-center gap-2`}>
                <img src='/trello.svg' alt='Tableros' className='size-4' />
                <span className='font-semibold text-sm'>Tableros</span>
            </button>
            <h2 className='text-sm text-slate-500 font-medium border-b border-b-gray-300 p-2'>Espacios de trabajo</h2>
            <ul className="flex flex-col gap-4 list-none">
                {workspaces.map((workspace) => {
                    return(
                        <CardWorkspace 
                            key={workspace.id} 
                            id={workspace.id}
                            logo={workspace.logo}
                            name={workspace.name} 
                        />
                    )
                })}
            </ul>
        </aside>
    );
}