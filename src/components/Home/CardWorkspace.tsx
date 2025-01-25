import { ChevronDown, ChevronRight, Settings, Trello, UserRound } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router"

interface CardWorkspaceProps {
    id: string,
    name: string,
    logo: string,
}

export default function CardWorkspace({id, logo, name}: CardWorkspaceProps) {
    const {idWorkspace} = useParams<{idWorkspace: string}>();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const isWorkspace = id === idWorkspace;

    return (
        <li className=" flex flex-col gap-2">
            <div className={` w-full p-2 rounded-lg ${isWorkspace && !isOpen ? 'bg-sky-100 text-blue-600' : 'text-gray-800 hover:bg-slate-200'}   cursor-pointer block relative transition-all ease-out duration-300 h-full  `} onClick={handleOpen}>
                <div className="flex w-full justify-between gap-2 sm:gap-2 lg:gap-3 items-center">
                    <div className="relative flex items-center justify-center h-9 w-12 sm:h-7 sm:w-10 lg:h-9 lg:w-14 bg-gray-200 rounded-md text-gray-800 font-bold text-lg sm:text-sm lg:text-xl">
                        <img src={logo} alt="" className="h-full w-full rounded-md" />
                        <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                            {name[0].toUpperCase()}
                        </span>
                    </div>
                    <h2 className="text-start text-sm w-full  font-semibold ">{name}</h2> 
                    <ChevronDown className={`size-6 transform  transition-all duration-200 ${isOpen && 'rotate-180'}`}/>   
                </div>
                
            </div>
            <ul className={`${isOpen ? 'block' : 'hidden'} flex flex-col gap-2`}>
                <li className="block">
                    <Link to={`/w/${id}/home`} className={` w-full py-2 pl-10  rounded-lg ${isWorkspace ? 'bg-sky-100 text-blue-600' : 'text-gray-700'} hover:bg-slate-200  transition-all ease-in-out  duration-200 h-full flex text-sm   gap-1  items-center `}>
                        <Trello className="size-4"/>
                        Tableros
                    </Link>
                </li>
                <li className="block">
                    <Link to={`/w/${id}/members`} className='group  w-full py-2 pl-10 rounded-lg  hover:bg-slate-200 text-gray-700 transition-all ease-in-out  duration-200 h-full flex text-sm   justify-between  items-center overflow-hidden'>
                        <div className="flex gap-1">
                            <UserRound className="size-4"/>
                            Miembros
                        </div>
                        
                        <ChevronRight className={`translate-x-full  size-4 group-hover:-translate-x-2 group-hover:block transition-all duration-300 ease-in-out`}/>
                    </Link>
                </li>
                <li className="block">
                    <Link to={`/w/${id}/account`} className='relative group w-full py-2 pl-10  rounded-lg  hover:bg-slate-200 text-gray-700 transition-all ease-in-out  duration-200 h-full flex text-sm   justify-between  items-center overflow-hidden'>
                        <div className="flex gap-1">
                            <Settings className="size-4"/>
                            Configuración
                        </div>
                        <ChevronRight className={`translate-x-full  size-4 group-hover:-translate-x-2 group-hover:block transition-all duration-300 ease-in-out`}/>

                    </Link>
                </li>
            </ul>
        </li>
        
    )
}