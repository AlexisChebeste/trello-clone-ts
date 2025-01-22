import {Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addWorkspace } from "../../redux/states/workspaceSlices";
import { mockGetWorkspace } from "../../mockApi";


export default function AddWorkspace() {
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");
    const [open, setOpen] = useState(false);
    const [workspaceName, setWorkspaceName] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open)
    }

    const sendWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newWorkspace = mockGetWorkspace(workspaceName)
        dispatch(addWorkspace(newWorkspace))
        navigate(`/w/${newWorkspace.id}`)
        setOpen(false)
        setWorkspaceName('')
    }

    addEventListener('click', (e) => {
        const modalAdd = document.getElementById('modalAdd')
        const addWorkspace = document.getElementById('add-workspace')
        if(modalAdd && addWorkspace){
            if(e.target === modalAdd){
                setOpen(false)
            }
        }
    })

    return(
        <div className=" z-50 ">
            <button className={`p-2 ${isBoardPage ? 'bg-white/20 hover:bg-white/30': 'bg-blue-500 hover:bg-blue-600'} text-white rounded-md font-semibold flex items-center gap-1 text-sm`} onClick={handleOpen}>
                <Plus size={20} />
            </button>
            <div id="modalAdd" className={`${open ? 'fixed': 'hidden'} top-0 left-0  bg-black/50 w-full min-h-screen flex items-center justify-center px-4`} >
                <div id="add-workspace" className="bg-white shadow-lg rounded-md py-6 px-6 flex flex-col gap-4 border-slate-200 border w-full max-w-md text-xl text-slate-600  ">
                    <h2 className=" font-medium text-2xl text-slate-800">Vamos a crear un espacio de trabajo</h2>
                    <p className="text-lg">
                        Impulsa tu productividad facilitándoles a todos el acceso a los tableros en una única ubicación.  
                    </p>
                    <form className="w-full flex flex-col gap-2" onSubmit={sendWorkspace}>
                        <label htmlFor="workspace-name" className="text-sm font-medium">Nombre del espacio de trabajo</label>
                        <input 
                            type="text" 
                            id="workspace-name" 
                            className="w-full border border-slate-200 rounded-md p-3 text-sm" 
                            placeholder='Taco.Co' 
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                        />
                        <button 
                            className="bg-blue-500 text-white font-semibold rounded-md text-lg p-2 mt-4"
                            type="submit"
                        >
                            Crear espacio de trabajo
                        </button>
                    </form>

                </div>
                
            </div>
        </div>
    )
}