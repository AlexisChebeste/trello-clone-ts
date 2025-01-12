interface AddbuttonProps {
    buttonRef: React.RefObject<HTMLButtonElement>;
    onClick: () => void;
    remaining: number;
}

export default function Addbutton({ buttonRef, onClick, remaining}: AddbuttonProps) {

    let remainingCant = 10 - remaining;

    return(
        <button 
            ref={buttonRef}
            onClick={onClick}
            disabled={remainingCant === 0}
            aria-label='Añadir nuevo tablero'
            className={`flex flex-col h-24 items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 w-full  p-5 transition-all rounded ease-in-out duration-300 border hover:border-gray-400 hover:shadow-none ${remainingCant === 0 ? 'cursor-not-allowed ' : 'cursor-pointer'}`}
        >
            <h2 className="text-lg text-gray-700 font-semibold">Añadir tablero</h2>
            <p>{remainingCant} restantes</p>
        </button>
    )
}