import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import {RootState } from "../../redux/store";


export default function MenuWorkspaces() {
    
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");
    const [open, setOpen] = useState(false);

    const { workspaces} = useSelector((state: RootState) => state.workspaces);

    
    const handleOpen = () => {
        setOpen(!open)
    }

    addEventListener('click', (e) => {
        const modalWorkspace = document.getElementById('modal-workspace');
        if(open && modalWorkspace && !e.composedPath().includes(modalWorkspace)){
            setOpen(false)
        }
    })

    return(
        <div id="modal-workspace" className="relative z-50 ">
            <button className={`p-2 ${isBoardPage ? 'hover:bg-white/30': 'hover:bg-slate-200'} rounded-md font-semibold flex items-center gap-1 text-sm min-w-32 w-full`} onClick={handleOpen}>
                Espacios de trabajo
                <ChevronDown size={24} />
            </button>
            <div className={`${open ? 'absolute': 'hidden'} top-12 left-0 bg-white shadow-lg rounded-md p-2 border-slate-200 border w-72 text-sm `} onClick={handleOpen}>
                <h3 className="px-4 py-2 font-medium text-slate-500">Tus Espacios de trabajo</h3>
                
                
                <div className="flex flex-col gap-2">
                    {workspaces && workspaces.length > 0 ? (
                        workspaces.map(workspace => (
                            <NavLink 
                                to={`/w/${workspace.id}`} 
                                className="px-4 py-2 hover:bg-slate-200 rounded-md font-semibold flex gap-2 items-center text-slate-700"
                                key={workspace.id}
                            >
                                <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white relative text-lg`} >
                                    <img src={workspace.logo} alt={workspace.name} className="size-full rounded-md"/>
                                    <span className="absolute inset-0 flex items-center justify-center font-bold">{workspace.name[0].toUpperCase()}</span>
                                </div>
                                {workspace.name}
                            </NavLink>
                        ))
                        ) : (
                            <p>No hay workspaces</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}