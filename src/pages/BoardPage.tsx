import { useState } from 'react';
import AsideBoards from '../components/AsideBoards';
import BoardSection from '../components/BoardSection';
import { useParams } from 'react-router';

export default function BoardPage() {
    const { id } = useParams()
    const [idBoard, setIdBoard] = useState(id || '')

    return(
        <main className="flex-1 w-full flex max-h-[calc(100vh-4rem)] h-full">
            <AsideBoards setIdBoard={setIdBoard} />
            <BoardSection idBoard={idBoard} />
        </main>
    )
}