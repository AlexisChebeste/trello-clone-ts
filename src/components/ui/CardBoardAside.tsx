interface CardBoardAsideProps {
    name: string;
    onClick: () => void;
}

export default function CardBoardAside({name, onClick}: CardBoardAsideProps) {


    return(
        <div className='p-2 px-4 cursor-pointer hover:bg-white/30  transition-all ease-in-out' onClick={onClick}>
            <h3 className='text-white  text-sm'>{name}</h3>
        </div>
    )
}