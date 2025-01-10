import { Link } from "react-router";
import { Board} from "../../types";
import { useColor } from "../../hooks/useColor";

interface CardBoardProps {
  board: Board;
}

export default function CardBoard({ board}: CardBoardProps) {
  const {setColor} = useColor();
  return (
    <Link 
      to={`/b/${board.id}/${board.name.replace(/ /g,'-')}`} 
      onClick={() => setColor(board.color || '')}
      className={`w-full ${board.color}   text-white rounded p-4 h-24 hover:scale-105 transition-all ease-in-out duration-200 mb-5`}
    >
      <h2 className="text-lg font-semibold">
        {board.name}
      </h2>
    </Link>
    
  );
}