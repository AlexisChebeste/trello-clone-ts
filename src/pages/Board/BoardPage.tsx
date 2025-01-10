import { useParams } from 'react-router';
import AsideBoards from '../../components/Aside/AsideBoards';
import BoardSection from '../../components/BoardPage/BoardSection';
import { useColor } from '../../hooks/useColor';

export default function BoardPage() {
    const {idWorkspace} = useParams()
    const {color} = useColor()

    return(
        <div className={`flex-1 w-full flex max-h-[calc(100vh-4rem)] h-full ${color}`}>
            <AsideBoards  
                idWorkspace={idWorkspace || '1'} 
                className={`bg-black/20 drop-shadow-md  text-white `}
            />
            <BoardSection />
        </div>
    )
}