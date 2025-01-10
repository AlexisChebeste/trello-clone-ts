import { Ellipsis } from "lucide-react";
import { Link } from "react-router";

interface CardBoardAsideProps {
    id: string,
    name: string;
    color: string;
    onClick: () => void;
}

export default function CardBoardAside({id,name,color ,onClick}: CardBoardAsideProps) {
    const isBoardPage = location.pathname.includes("b/");

    return(
        <div className={`flex ${isBoardPage ? 'hover:bg-white/10' : 'hover:bg-gray-100'} justify-between items-center  transition-all ease-in-out duration-200 group `}>
            <Link to={`/b/${id}/${name.replace(/ /g,'-')}`} onClick={onClick}
                className='flex gap-2 py-2 items-center w-full px-4 cursor-pointer'
                aria-label="Tablero"
                aria-describedby="Tablero"
                aria-labelledby="Tablero"
            >
                <div className={`w-7 h-5 rounded-sm ${color}`}></div>
                <h3 className='  text-sm'>{name}</h3>
            </Link>
            <button className={`p-2  ${isBoardPage ? 'hover:bg-white/30' : 'hover:bg-gray-200'}  rounded-md transition-all ease-in-out duration-200 hidden group-hover:flex mr-2`}>
                <Ellipsis className='size-4 '/>
            </button>

        </div>
    )
}