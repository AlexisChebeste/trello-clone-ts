import { Link } from "react-router";
import { Board, Workspace } from "../../types";
import { useColor } from "../../hooks/useColor";

interface CardBoardProps {
  board: Board;
  workspace: Workspace;
}

export default function CardBoard({ board, workspace }: CardBoardProps) {
  const {setColor} = useColor();
  return (
    <Link 
      to={`${workspace.id}/board/${board.id}`} 
      onClick={() => setColor(board.color || '')}
      className={`w-full ${board.color} hover:opacity-85  text-white rounded p-4 h-24 hover:scale-105 transition-all ease-in-out duration-200 mb-5`}
    >
      <h2 className="text-lg font-semibold">
        {board.name}
      </h2>
    </Link>
    
  );
}