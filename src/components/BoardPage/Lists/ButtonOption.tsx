
interface ButtonOptionProps {
    children: React.ReactNode
    onClick: () => void
}

export default function ButtonOption({children, onClick}: ButtonOptionProps) {

    return(
        <button 
            className="hover:bg-gray-100 w-full h-full py-2 px-4 text-left"
            onClick={onClick}
        >
            {children}
        </button>
    )
}