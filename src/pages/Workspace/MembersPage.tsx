import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";
import { CircleHelp, UserRoundPlus, X } from "lucide-react";

export default function MembersPage() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!workspace){
        return <div>Workspace not found</div>
    }
    return(
        <div className=" flex-1 h-full flex flex-col py-4 px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200">
                    <UserRoundPlus  />
                    Invitar a miembros del espacio de trabajo
                </button>
            </WorkspaceInfo>

            <div className="mt-6 flex flex-col gap-4">
                <h3 className="text-slate-700 font-semibold text-xl">Colaboradores <span className="ml-3 bg-slate-200 text-slate-700 font-normal  px-3 rounded-full text-base">{workspace.members?.length}/10</span></h3>
                <div className="flex flex-col ">
                    <div className="border-y border-slate-300 py-4">
                        <input type="text" placeholder="Filtrar por nombre" className="text-sm text-slate-700 placeholder:text-slate-500 py-2 px-3 border border-slate-500 rounded-sm hover:bg-slate-100"/>
                    </div>
                    {workspace.members?.map((member) => (
                        <div key={member.id} className="flex justify-between items-center gap-5 border-b border-b-slate-300 py-4">
                            <div className="flex items-center gap-4 ">
                                <div  className="w-12 h-8 rounded-full bg-sky-400" />
                                <div className="flex flex-col">
                                    <span className=" text-slate-800 font-semibold">{member.name}</span>
                                    <span className="text-sm text-slate-500">{member.email} • Última actividad: January 2025</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-slate-200 hover:bg-slate-300 py-2 px-3 rounded-md text-slate-800 font-semibold text-sm w-max">Ver tableros ({workspace.boards.length})</button>
                                <button className="bg-slate-200 hover:bg-slate-300 py-2 px-3 rounded-md text-slate-800 font-semibold text-sm flex gap-2 items-center">Administrador <CircleHelp className="size-4"/></button>
                                <button className="bg-slate-200 hover:bg-slate-300 py-2 px-3 rounded-md text-slate-800 font-semibold text-sm flex gap-2 items-center"><X className="size-4"/> Dejar... </button>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}