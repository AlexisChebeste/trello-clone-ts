import { Plus } from "lucide-react";


export interface ButtonAddProps {
    onClick: () => void;
    className?: string;
    title: string;
}

export default function ButtonAdd({onClick, className, title}: ButtonAddProps) {
    return (
        <button onClick={onClick} className={`flex items-center  gap-3 w-full rounded-xl transition-all ease-in-out duration-100  ${className}`}>
            <Plus className="size-5" />
            <h2 className="text-md  font-medium">Añadir {title}</h2>
        </button>
    )
}