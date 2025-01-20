// Type: Component
interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
}



export default function Button({children, className, onClick}: ButtonProps) {
    return (
        <button onClick={onClick} className={`border border-gray-300 hover:bg-slate-100  font-bold p-3 rounded-lg  transition-colors ${className}`}>

            {children}
        </button>
    )
}