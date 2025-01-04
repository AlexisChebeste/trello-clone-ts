import { useParams } from 'react-router';
import AsideBoards from '../components/AsideBoards';
import BoardSection from '../components/BoardSection';
import { useState } from 'react';

export default function BoardPage() {
    const {workspaceId,id} = useParams<{ workspaceId: string, id: string}>();
    const [idBoard, setIdBoard] = useState<string>('');

    return(
        <div className="flex overflow-hidden w-full h-full min-h-[calc(100vh-4rem)]">
            <AsideBoards 
                className='bg-blue-aside' 
                idWorkspace={workspaceId || '1'} 
                setIdBoard={setIdBoard}
            />
            <BoardSection idBoard={idBoard || id || '1' }/>
        </div>
    )
}