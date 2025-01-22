import { useEffect } from 'react';
import CardWorkspace from './CardWorkspace';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkspacesFailure, getWorkspacesStart, getWorkspacesSuccess } from '../../redux/states/workspaceSlices';
import { mockGetWorkspace } from '../../mockApi';
import { AppStore } from '../../redux/store';


export default function AsideWorkspace() {

    const dispatch = useDispatch();
    const { workspaces, loading, error } = useSelector((state: AppStore) => state.workspace);

    useEffect(() => {
        dispatch(getWorkspacesStart());
        try {
        const mockWorkspaces = [mockGetWorkspace('Workspace1'), mockGetWorkspace('Workspace2'), mockGetWorkspace('Workspace3')]; // Simula que obtenemos los workspaces
        dispatch(getWorkspacesSuccess(mockWorkspaces));
        } catch (e) {
        dispatch(getWorkspacesFailure('Error al cargar los workspaces'));
        }
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
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