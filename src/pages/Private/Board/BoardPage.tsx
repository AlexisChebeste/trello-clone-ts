import { useParams } from 'react-router';
import AsideBoards from '../../../components/Aside/AsideBoards';
import BoardSection from '../../../components/BoardPage/BoardSection';
import { useWorkspace } from '../../../hooks/useWorkspace';
import Layout from '../../Layout';

export default function BoardPage() {
    const {idBoard} = useParams<{idBoard: string}>()
    const {workspaces}= useWorkspace()

    const board = workspaces.
        flatMap(workspace => workspace.boards)
        .find(board => board.id === idBoard);


    if(!board) return <div>Board not found</div>

    return(
        <Layout className={`${board?.color}`}>
            <div className={`flex-1 w-full flex  h-full overflow-y-auto  `}>
                <AsideBoards  
                    idWorkspace={board?.idWorkspace || '1'} 
                    className={`bg-black/20 drop-shadow-md  text-white `}
                />
                <BoardSection />
            </div>
        </Layout>
        
    )
}