interface ButtonWorkspaceProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function ButtonWorkspace({children, className, onClick}: ButtonWorkspaceProps){
    return(
        <button 
            onClick={onClick}
            className={`flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-md text-slate-800 font-semibold text-sm w-max ${className}`}
        >
            {children}
        </button>
    )
}
