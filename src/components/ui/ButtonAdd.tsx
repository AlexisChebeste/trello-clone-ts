import { Plus } from "lucide-react";

export interface ButtonAddProps {
    onClick: () => void;
    children?: React.ReactNode;
    className?: string;
    title: string;
}

export default function ButtonAdd({onClick, children, className, title}: ButtonAddProps) {
    return (
        <button onClick={onClick} className={`flex items-center justify-center gap-4 hover:bg-slate-200 w-full rounded-lg hover:shadow-md p-5 transition-shadow ease-in-out duration-300 border border-gray-300  font-bold  ${className}`}>
            <Plus className='size-5'/>
            <h2 className="text-lg font-semibold">Añadir {title}</h2>
            {children}
        </button>
    )
}