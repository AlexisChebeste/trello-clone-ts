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
      className="w-full  bg-zinc-500 rounded-lg hover:bg-zinc-800 text-white p-4 h-28 hover:scale-105 transition-all ease-in-out duration-200"
    >
      <h2 className="text-lg font-semibold">
        {board.name}
      </h2>
    </Link>
    
  );
}