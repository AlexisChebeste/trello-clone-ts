import { useParams } from 'react-router';
import AsideBoards from '../../components/Aside/AsideBoards';
import BoardSection from '../../components/BoardPage/BoardSection';
import { useColor } from '../../hooks/useColor';
import { useWorkspace } from '../../hooks/useWorkspace';

export default function BoardPage() {
    const {idBoard} = useParams<{idBoard: string}>()
    const {workspaces}= useWorkspace()
    const {color} = useColor()

    const idWorkspace = workspaces.find(workspace => workspace.boards.find(board => board.id === idBoard))?.id

    return(
        <div className={`flex-1 w-full flex  h-full overflow-y-auto  ${color}`}>
            <AsideBoards  
                idWorkspace={idWorkspace || '1'} 
                className={`bg-black/20 drop-shadow-md  text-white `}
            />
            <BoardSection />
        </div>
    )
}