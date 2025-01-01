interface CardProps {
    name: string,
    children?: React.ReactNode,
    onClick?: () => void
    className?: string
}

export function Card({name, children, onClick ,className}: CardProps) {
    return (
        <button onClick={onClick} className={`w-full rounded-lg shadow-md p-6 hover:scale-105 transition-all ease-in-out duration-200 h-full ${className}`} >
            <h2 className="text-lg font-semibold">{name}</h2>
            {children}
        </button>
    )
}