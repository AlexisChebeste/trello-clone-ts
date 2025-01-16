import { Link } from "react-router";
import { ModalCloseBoard } from "./ModalCloseBoard";
import { Board } from "../../types";

interface CardBoardAsideProps {
    board: Board;
    onClick: () => void;
    onArchive: (boardId: string) => void;
}

export default function CardBoardAside({board ,onClick, onArchive}: CardBoardAsideProps) {
    const isBoardPage = location.pathname.includes("b/");

    return(
        <div className={`flex ${isBoardPage ? 'hover:bg-white/10' : 'hover:bg-gray-100'} justify-between items-center  transition-all ease-in-out duration-200 group `}>
            <Link to={`/b/${board.id}/${board.name.replace(/ /g,'-')}`} onClick={onClick}
                className='flex gap-2 py-2 items-center w-full px-4 cursor-pointer'
                aria-label="Tablero"
                aria-describedby="Tablero"
                aria-labelledby="Tablero"
            >
                <div className={`w-7 h-5 rounded-sm ${board.color}`}></div>
                <h3 className='  text-sm'>{board.name}</h3>
            </Link>
            <ModalCloseBoard board={board} onArchive={onArchive}/>

        </div>
    )
}