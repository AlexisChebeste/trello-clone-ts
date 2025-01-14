import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import { Link, UserRoundPlus} from "lucide-react";
import Members from "../../components/MembersPage/Members";
import SidebarLinks from "../../components/MembersPage/SidebarLinks";
import ButtonWorkspace from "../../components/ButtonWorkspace";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";

export default function MembersPage() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!workspace){
        return <div>Workspace not found</div>
    }
    return(
        <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                <button className="text-sm bg-blue-600 text-white px-2 md:px-4 py-2 rounded-md flex items-center font-semibold w-56 sm:w-max gap-2  hover:bg-blue-700 transition-colors duration-200">
                    <UserRoundPlus  />
                    Invitar a miembros del espacio de trabajo
                </button>
            </WorkspaceInfo>

            <div className="flex flex-col xl:flex-row  gap-4 ">
                <SidebarLinks membersLength={workspace.boards?.length}/>

                <div className="flex-1">
                    <h3 className="text-slate-700 font-semibold text-xl">Miembros del espacio de trabajo ({workspace.boards?.length})</h3>
                    <p className="text-slate-600 text-sm mt-2 mb-4">
                        Los miembros del Espacio de trabajo pueden ver todos los tableros visibles para el Espacio de trabajo, unirse a ellos y crear nuevos tableros en el Espacio de trabajo.

                    </p>
                    <div className="py-6 border-t border-t-gray-300">
                        <h3 className="text-slate-700 font-semibold text-xl">Invita a los miembros a unirse</h3>
                        <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  mt-4">
                            <p className="text-slate-600 text-sm w-full">Cualquiera que tenga un enlace de invitación puede unirse a este Espacio de trabajo gratuito. También puedes deshabilitar y crear un nuevo enlace de invitación para este Espacio de trabajo en cualquier momento. Las invitaciones pendientes cuentan para el límite de 10 colaboradores.</p>
                            <div className="w-56  md:w-72 lg:w-96 flex  flex-col items-center md:items-end ">
                                <ButtonWorkspace>
                                    <Link className="size-4"/>
                                    Invitar mediante enlace
                                </ButtonWorkspace>
                            </div>
                            
                        </div>
                    </div>
                    <Members members={workspace.members || []} />
                </div>
            </div>
            
        </div>
        
    )
}