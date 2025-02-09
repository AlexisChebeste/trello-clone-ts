import { Outlet, useParams } from "react-router";
import { UserRoundPlus} from "lucide-react";
import SidebarLinks from "../../../../components/MembersPage/SidebarLinks";
import { WorkspaceInfo } from "../../../../components/Boards/WorkspaceInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import InviteModal from "../../../../components/modals/Invitate/InviteModal";

interface MembersPageProps {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
}

export default function MembersPage({setIsModalOpen, isModalOpen}: MembersPageProps) {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    
    if(!workspace || !idWorkspace) {
        return <div>Workspace not found</div>
    }
    return(
        <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto">
            <WorkspaceInfo 
                logo={workspace.logo} 
                name={workspace.name} 
                description={workspace.description} 
                isPublic={workspace.isPublic} 
            >
                <button 
                    className="text-sm bg-blue-600 text-white px-2 md:px-4 py-2 rounded-md flex items-center font-semibold w-56 sm:w-max gap-2  hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => setIsModalOpen(true)}
                >
                    <UserRoundPlus  />
                    Invitar a miembros del espacio de trabajo
                </button>
            </WorkspaceInfo>

            <div className="flex flex-col xl:flex-row  gap-4 ">
                <SidebarLinks 
                    membersLength={workspace.members?.length}
                    invitedGuestsLength={workspace.invitedGuests?.length}
                    invitationsLength={workspace.invitations?.length}
                />

                <Outlet />
            </div>
            {isModalOpen && (
                <InviteModal onClose={() => setIsModalOpen(false)} type="workspace" id={idWorkspace} />
            )}
        </div>
        
    )
}