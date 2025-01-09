// Usage: <CardWorkspace>...</CardWorkspace>
interface CardWorkspaceProps {
    name: string,
    logo: string,
    cantBoards: number
    onClick: () => void
}

export default function CardWorkspace({ logo, name, cantBoards, onClick}: CardWorkspaceProps) {


    return (
        <button onClick={onClick} className='w-full p-2 rounded-lg hover:bg-slate-200 transition-all ease-in-out duration-200 h-full flex gap-4 sm:gap-2 lg:gap-3 items-center'>
            <div className={`flex items-center justify-center h-10 w-14 sm:h-8 sm:w-9 lg:h-10 lg:w-14 ${logo} rounded-md text-white font-bold text-lg sm:text-sm lg:text-xl`}>{name[0].toUpperCase()}</div>
            <div className="flex flex-col text-start w-full">
                <h2 className="text-md  text-gray-800 font-semibold">{name}</h2>
                <p className="text-sm text-gray-500 ">
                    Tableros: {cantBoards}
                </p>
            </div>
        </button>
    )
}