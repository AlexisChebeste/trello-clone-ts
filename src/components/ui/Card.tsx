interface CardProps {
    title: string,
    className?: string
}

export function Card({title, className}: CardProps) {
    return (
        <button className={`w-full items-start bg-white rounded-xl h-12 drop-shadow-md ${className}`} >
            <h3 className="text-sm font-semibold text-start text-blue-950 ml-4">{title}</h3>
        </button>
    )
}