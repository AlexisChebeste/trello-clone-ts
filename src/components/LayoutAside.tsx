import { Outlet, useParams } from "react-router";
import AsideBoards from "./Aside/AsideBoards";
import { WorkspaceInfo } from "./Boards/WorkspaceInfo";
import { useWorkspace } from "../hooks/useWorkspace";
import { UserRoundPlus } from "lucide-react";


export default function LayoutAside(){
    const {idWorkspace} = useParams()

    const {workspaces} = useWorkspace()
    const workspace = workspaces.find(w => w.id === idWorkspace)

    if(!workspace) return null

    return(
        <div className="flex-1 w-full flex h-full  overflow-hidden">
            <AsideBoards 
                idWorkspace={idWorkspace || ''} 
                className="text-slate-600" 
            />
            <main className="flex-1 flex h-full">
                {/* Aquí va el contenido de la página */}
                <div className=" flex-1 h-full flex flex-col py-4 px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
                    <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                        <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200">
                            <UserRoundPlus  />
                            Invitar a miembros del espacio de trabajo
                        </button>
                    </WorkspaceInfo>
                
                    <Outlet/>
                </div> 
            </main>
        </div>
    )
}