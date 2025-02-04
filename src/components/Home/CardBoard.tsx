import { Link } from "react-router";
import { IBoard} from "../../types";

interface CardBoardProps {
  board: IBoard;
}

export default function CardBoard({ board}: CardBoardProps) {
  return (
    <div  className={`w-full text-white rounded h-24  transition-all ease-in-out duration-300 flex  relative `}>
      <img src={`/public${board.color}`} alt="background board color" className="w-full h-full object-cover rounded absolute"/>
      <Link 
        to={`/b/${board.id}/${board.name.replace(/ /g,'-')}`} 
        className={`absolute w-full h-full hover:bg-black/30 rounded p-4 transition-all ease-in-out duration-300 `}
      >
        <h2 className="text-lg font-semibold">
          {board.name}
        </h2>
      </Link>
    </div>
    
    
  );
}