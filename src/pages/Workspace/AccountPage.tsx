import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import ButtonWorkspace from "../../components/ButtonWorkspace";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";
import { LockKeyhole, UserRoundPlus } from "lucide-react";

export default function AccountPage(){
    const {workspaces} = useWorkspace();
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!workspace){
        return <div>Workspace not found</div>
    }

    return(
        <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200 relative">
                    <UserRoundPlus  />
                    Invitar a miembros del espacio de trabajo
                </button>
            </WorkspaceInfo>
            <div className="flex flex-col py-6 gap-6">
                <h2 className="text-slate-700 font-semibold text-xl">Ajustes del Espacio de trabajo</h2>
                
                <div className="py-4 flex flex-col gap-4">
                    <h3 className="text-slate-700 font-semibold text-xl">Invita a los miembros a unirse</h3>
                    <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  py-4 border-t border-t-gray-300">
                        <div className="flex items-start w-full relative">
                            <LockKeyhole className="size-4 text-gray-700 absolute" />
                            <p className="text-sm text-gray-700 text-wrap">
                                <strong className="ml-5">Privado</strong> – Este Espacio de trabajo es privado. No está indexado para las personas que no pertenezcan al Espacio de trabajo, y no lo podrán ver.
                            </p>
                        </div>
                        <div className="w-40  flex  flex-col items-center md:items-end ">
                            <ButtonWorkspace>
                                Cambiar
                            </ButtonWorkspace>
                        </div>
                        
                    </div>
                </div>
                <button className="text-red-700 font-semibold hover:underline">¿Eliminar este Espacio de trabajo?</button>
                
            </div>
        </div>
    )
}