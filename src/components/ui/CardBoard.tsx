import { Link } from "react-router";
import { Board, Workspace } from "../../types";

interface CardBoardProps {
  board: Board;
  workspace: Workspace;
}

export default function CardBoard({ board, workspace }: CardBoardProps) {
  return (
    <Link 
      to={`${workspace.id}/board/${board.id}`} 
      className="w-full bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 hover:opacity-85 rounded-lg text-white p-4 h-28 hover:scale-105 transition-all ease-in-out duration-200"
    >
      <h2 className="text-lg font-semibold">
        {board.name}
      </h2>
    </Link>
    
  );
}