import CardBoard from '../Home/CardBoard';
import { UserRound } from 'lucide-react';
import { useParams } from 'react-router';
import { WorkspaceInfo } from './WorkspaceInfo';
import Addbutton from './Addbutton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useBoards } from '../../hooks/useBoards';
import ArchivedBoards from '../WorkspacePage/ArchivedBoards';

export default function Boards() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    let workspace;
    (idWorkspace === ':idWorkspace') ? 
        workspace = workspaces[0]
        :
        workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    


    const {
        filteredBoards,
        boardsArchived
    } = useBoards(idWorkspace);

    if(!workspace) {
        return <div>El espacio de trabajo no existe</div>
    }

    return(
        <div className="w-full flex flex-col gap-8">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description} isPublic={workspace.isPublic}/>
            
            
            <article className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <UserRound className='size-6 text-slate-500'/>
                    <h2 className='text-slate-800 font-semibold'>Tus tableros</h2>
                </div>
                
                <div className="relative w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-items-stretch gap-2 lg:gap-4 ">
                    {filteredBoards.map((board) => (
                        <CardBoard key={board.id} board={board} />
                    ))}
                    <Addbutton remaining={workspace.boards.length} workspaceId={workspace.id}/>
                    
                </div>
                <ArchivedBoards boardsArchived={boardsArchived} nameWorkspace={workspace.name}/>
            </article>
            
            
        </div>
    )
}