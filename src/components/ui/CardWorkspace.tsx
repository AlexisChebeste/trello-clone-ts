// Usage: <CardWorkspace>...</CardWorkspace>
interface CardWorkspaceProps {
    name: string,
    cantBoards: number
    onClick: () => void
}

export default function CardWorkspace({ name, cantBoards, onClick}: CardWorkspaceProps) {


    return (
        <button onClick={onClick} className='w-full rounded-lg shadow-md p-6 hover:scale-105 transition-all ease-in-out duration-200 h-full '>
            
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500 mt-2">
                Tableros: {cantBoards}
            </p>
        </button>
    )
}