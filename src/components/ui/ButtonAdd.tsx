

export interface ButtonAddProps {
    onClick: () => void;
    children?: React.ReactNode;
    className?: string;
    title: string;
}

export default function ButtonAdd({onClick, children, className, title}: ButtonAddProps) {
    return (
        <button onClick={onClick} className={`flex items-center justify-center gap-3 bg-slate-200 hover:bg-slate-300 w-full rounded-xl hover:shadow-md p-5 transition-all ease-in-out duration-300 border hover:border-gray-400  ${className}`}>
            <h2 className="text-lg text-gray-700 font-semibold">Añadir {title}</h2>
            {children}
        </button>
    )
}