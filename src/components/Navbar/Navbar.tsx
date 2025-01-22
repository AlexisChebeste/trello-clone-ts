import { NavLink, useLocation, } from "react-router";
import Logout from "./Logout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../redux/store";

export default function Navbar() {
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");
    const workspaces = useSelector((state: AppStore) => state.workspace.workspaces);
    const [open, setOpen] = useState(false);

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
        <header 
            className='border-b  border-b-slate-200/60  backdrop-blur-sm  h-14 w-full z-50'>
            <nav className={`${isBoardPage ?  'text-white bg-black/40 ' :'text-slate-600'}`}>
                <div className="flex justify-between h-14 px-6">
                    <div className='flex gap-6  items-center'>
                        
                        <NavLink 
                            to={`/w/${workspaces[0].id}/home`} 
                            className= {`flex-shrink-0 flex gap-1 items-center `}
                        >
                            <span className='text-xl font-bold '>
                                TrelloClone
                            </span>
                        </NavLink>
                        
                        <div id="modal-workspace" className="relative z-50 ">
                            <button className={`p-2 ${isBoardPage ? 'hover:bg-white/30': 'hover:bg-slate-200'} rounded-md font-semibold flex items-center gap-1 text-sm`} onClick={handleOpen}>
                                Espacios de trabajo
                                <ChevronDown size={24} />
                            </button>
                            <div className={`${open ? 'absolute': 'hidden'} top-12 left-0 bg-white shadow-lg rounded-md p-2 border-slate-200 border w-72 text-sm `} >
                                <h3 className="px-4 py-2 font-medium text-slate-500">Tus Espacios de trabajo</h3>
                                <div className="flex flex-col gap-2">
                                    {workspaces.map(workspace => (
                                        <NavLink 
                                            to={`/w/${workspace.id}/home`} 
                                            className="px-4 py-2 hover:bg-slate-200 rounded-md font-semibold flex gap-2 items-center text-slate-700"
                                            key={workspace.id}
                                        >
                                            <div className={`w-10 h-10 ${workspace.logo} rounded-md flex items-center justify-center text-white`} >
                                                <span>{workspace.name[0]}</span>
                                            </div>
                                            {workspace.name}
                                        </NavLink>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                        

                    </div>
                    
                    <Logout/>
                </div>
            </nav>
        </header>
    )
}