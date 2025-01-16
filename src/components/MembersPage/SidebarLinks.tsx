import { Link, useLocation } from "react-router";
import { useParams } from "react-router";

interface SidebarLinksProps {
    membersLength: number;
}

export default function SidebarLinks({membersLength} : SidebarLinksProps) {

    const {idWorkspace} = useParams<{idWorkspace: string}>();

    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return(
        <div className="mt-6 flex flex-col gap-4 w-60">
            <h3 className="text-slate-700 font-semibold text-xl">Colaboradores <span className="ml-3 bg-slate-200 text-slate-700 font-normal  px-3 rounded-full text-base">{membersLength}/10</span></h3>
        
        
            <div className="mt-6 flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                    <Link 
                        to={`/w/${idWorkspace}/members`} 
                        className={`text-sm px-4 py-2 rounded-md flex items-center font-semibold  w-56 sm:w-full gap-2   transition-colors duration-200  
                            ${isActive(`/w/${idWorkspace}/members`) ? 'bg-blue-100 text-blue-600 ' : 'text-gray-800 hover:bg-slate-200'}
                        `}
                    >
                        Miembros del espacio de trabajo ({membersLength}) 
                    </ Link>
                    <Link 
                        to={`/w/${idWorkspace}/members/guests`} className={`text-sm  px-4 py-2 rounded-md flex items-center font-semibold w-56 sm:w-full gap-2   transition-colors duration-200
                            ${isActive(`/w/${idWorkspace}/members/guests`) ? 'bg-blue-100 text-blue-600  ' : 'text-gray-800 hover:bg-slate-200'}
                        `}>
                        Invitados ({membersLength}) 
                    </ Link>
                </div>
                
                <div className="py-4 border-t border-t-gray-200 ">
                    <Link 
                        to={`/w/${idWorkspace}/members/request`} 
                        className={`text-sm px-4 py-2 rounded-md flex items-center font-semibold w-56 sm:w-full gap-2  transition-colors duration-200
                            ${isActive(`/w/${idWorkspace}/members/request`) ? 'bg-blue-100 text-blue-600  ' : 'text-gray-800 hover:bg-slate-200'}
                        `}>
                        Solicitudes de unión ({membersLength}) 
                    </ Link>
                </div>
                
            </div>
        </div>
    )
}