import { useParams } from 'react-router';
import AsideBoards from '../../../components/Aside/AsideBoards';
import BoardSection from '../../../components/BoardPage/BoardSection';
import Layout from '../../Layout';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect } from 'react';
import { fetchBoardById } from '../../../redux/states/boardsSlice';

export default function BoardPage() {
    const {idBoard} = useParams<{idBoard: string}>()
    const dispatch = useDispatch<AppDispatch>()

    const {selectedBoard} = useSelector((state: RootState) => state.boards)

    useEffect(() => {
        if (idBoard) {
            dispatch(fetchBoardById(idBoard))
        }
    }, [idBoard])


    if(!selectedBoard || !idBoard) return <div>Board not found</div>

    

    return(
        <Layout 
            bgImage={selectedBoard.color}
        >
            <div className={`flex-1 w-full flex  h-full overflow-y-auto  `}>
                <AsideBoards  
                    idWorkspace={selectedBoard.idWorkspace} 
                    className={`bg-black/20 drop-shadow-md  text-white `}
                />
                <BoardSection board={selectedBoard}/>
            </div>
        </Layout>
        
    )
}