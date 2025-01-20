import { Link } from "react-router";
import { Board} from "../../types";

interface CardBoardProps {
  board: Board;
}

export default function CardBoard({ board}: CardBoardProps) {
  return (
    <div className={`w-full  ${board.color || 'bg-blue-500'}  text-white rounded h-24  transition-all ease-in-out duration-300 flex items-center justify-center`}>
      <Link 
      to={`/b/${board.id}/${board.name.replace(/ /g,'-')}`} 
      className={`w-full h-full hover:bg-black/30 rounded p-4 transition-all ease-in-out duration-300  `}
    >
      <h2 className="text-lg font-semibold">
        {board.name}
      </h2>
    </Link>
    </div>
    
    
  );
}