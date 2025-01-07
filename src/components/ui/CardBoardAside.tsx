interface CardBoardAsideProps {
    name: string;
    onClick: () => void;
    color: string;
}

export default function CardBoardAside({name, onClick, color}: CardBoardAsideProps) {


    return(
        <div className={`p-2 px-4 flex gap-2 items-center cursor-pointer hover:bg-white/30  transition-all ease-in-out `} onClick={onClick}>
            <div className={`w-7 h-5 rounded-sm ${color}`}></div>
            <h3 className='text-white  text-sm'>{name}</h3>
        </div>
    )
}