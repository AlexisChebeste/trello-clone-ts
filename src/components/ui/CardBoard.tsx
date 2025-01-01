import { Link } from "react-router";
import { Board } from "../../types";
import { Card } from "./Card";

export default function CardBoard({ board }: { board: Board }) {
  return (
    <Link to={`/board/${board.id}`} className="w-full h-full bg-zinc-500 rounded-lg hover:bg-zinc-500 hover:scale-105 transition-all ease-in-out duration-200">
      <Card name={board.name} className="w-full text-start h-28 hover:scale-100">
      </Card>
    </Link>
    
  );
}