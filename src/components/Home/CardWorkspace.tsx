import { useParams } from "react-router";
import { Link } from "react-router"

interface CardWorkspaceProps {
    id: string,
    name: string,
    logo: string,
}

export default function CardWorkspace({id, logo, name}: CardWorkspaceProps) {
    const {idWorkspace} = useParams<{idWorkspace: string}>();

    return (
        <Link to={`/w/${id}/home`} className={`group w-full p-2 rounded-lg ${id === idWorkspace ? 'bg-sky-200 text-blue-600' : 'text-gray-800'} hover:bg-slate-200  transition-all ease-in-out  duration-200 h-full flex  gap-2 sm:gap-2 lg:gap-3 items-center `}>
            
            <div className={`flex items-center justify-center h-9 w-10 sm:h-8 sm:w-9 lg:h-10 lg:w-14 ${logo} rounded-md text-white font-bold text-lg sm:text-sm lg:text-xl`}>{name[0].toUpperCase()}</div>
            <h2 className="text-start text-sm w-full  font-semibold">{name}</h2>
                    
        </Link>
    )
}