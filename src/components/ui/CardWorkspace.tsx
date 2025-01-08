// Usage: <CardWorkspace>...</CardWorkspace>
interface CardWorkspaceProps {
    name: string,
    cantBoards: number
    onClick: () => void
}

export default function CardWorkspace({ name, cantBoards, onClick}: CardWorkspaceProps) {


    return (
        <button onClick={onClick} className='w-full p-2 rounded-lg hover:bg-slate-200 transition-all ease-in-out duration-200 h-full flex gap-4 sm:gap-2 lg:gap-3 items-center'>
            <div className='py-2 px-4 sm:py-1 sm:px-3 lg:py-2 lg:px-4 bg-gradient-to-br from-sky-400 via-sky-600 to-blue-900 rounded-md text-white font-bold lg:text-xl'>E</div>
            <div className="flex flex-col text-start w-full">
                <h2 className="text-md  text-gray-800 font-semibold">{name}</h2>
                <p className="text-sm text-gray-500 ">
                    Tableros: {cantBoards}
                </p>
            </div>
        </button>
    )
}