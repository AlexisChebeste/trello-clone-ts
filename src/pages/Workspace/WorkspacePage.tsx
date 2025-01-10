import { useParams } from "react-router";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";
import { useWorkspace } from "../../hooks/useWorkspace";
import { UserRoundPlus } from "lucide-react";

export default function WorkspacePage() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useWorkspace();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    return(
        <div className="p-10">
            {workspace &&
                <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                    <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold w-max hover:bg-blue-700 transition-colors duration-200">
                        <UserRoundPlus  className="mr-2 size-4"/>
                        Invitar a miembros del espacio de trabajo
                    </button>
                </WorkspaceInfo>
            }
            
        </div>
                 
    )
}