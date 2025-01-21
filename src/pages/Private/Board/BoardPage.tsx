import { useParams } from 'react-router';
import AsideBoards from '../../../components/Aside/AsideBoards';
import BoardSection from '../../../components/BoardPage/BoardSection';
import Layout from '../../Layout';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';

export default function BoardPage() {
    const {idBoard} = useParams<{idBoard: string}>()
    const workspaces = useSelector((store: AppStore) => store.workspace.workspaces)

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