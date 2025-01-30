import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import {AppDispatch, RootState } from "../../redux/store";
import { fetchUserWorkspaces } from "../../redux/states/workspacesSlices";


export default function MenuWorkspaces() {
    
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { workspaces, loading, error } = useSelector((state: RootState) => state.workspaces);

    useEffect(() => {
        dispatch(fetchUserWorkspaces());
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(!open)
    }

    addEventListener('click', (e) => {
        const modalWorkspace = document.getElementById('modal-workspace');
        if(open && modalWorkspace && !e.composedPath().includes(modalWorkspace)){
            setOpen(false)
        }
    })

    if (loading) return <p>Cargando workspaces...</p>;
    if (error) return <p>Error: {error}</p>;


    return(
        <div id="modal-workspace" className="relative z-50 ">
            <button className={`p-2 ${isBoardPage ? 'hover:bg-white/30': 'hover:bg-slate-200'} rounded-md font-semibold flex items-center gap-1 text-sm`} onClick={handleOpen}>
                Espacios de trabajo
                <ChevronDown size={24} />
            </button>
            <div className={`${open ? 'absolute': 'hidden'} top-12 left-0 bg-white shadow-lg rounded-md p-2 border-slate-200 border w-72 text-sm `} >
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
                                    <img src={`/public${workspace.logo}`} alt={workspace.name} className="size-full rounded-md"/>
                                    <span className="absolute inset-0 flex items-center justify-center">{workspace.name[0]}</span>
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