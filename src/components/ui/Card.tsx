interface CardProps {
    title: string,
    className?: string
}

export function Card({title, className}: CardProps) {
    return (
        <button className={`w-full items-start bg-slate-100 rounded-lg h-14 ${className}`} >
            <h3 className="text-sm font-semibold text-start ml-4">{title}</h3>
        </button>
    )
}