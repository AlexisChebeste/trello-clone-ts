import CardWorkspace from './CardWorkspace';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TrelloIcon from '../Navbar/TrelloIcon';
import { Link } from 'react-router';


export default function AsideWorkspace() {

    const { workspaces, loading, error } = useSelector((state: RootState) => state.workspaces);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const isBoard = window.location.pathname.includes('/u/');
    const username = JSON.parse(localStorage.getItem('user') || '{}').user.replace(/\s+/g, '')

    return(
        <aside className='hidden h-full p-2 lg:p-4 bg-white sm:flex flex-col gap-4 w-full max-w-56  lg:max-w-64'>
            
            <Link 
                to={`/u/${username}/boards`}
                className={` w-full p-2 rounded-lg ${isBoard ? 'bg-sky-100 text-blue-600' : 'text-gray-800 hover:bg-slate-200'} cursor-pointer transition-all ease-out duration-300 h-full flex items-center gap-2`}
            >
                <TrelloIcon className='size-5' />
                <span className='font-semibold text-sm'>Tableros</span>
            </Link>
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