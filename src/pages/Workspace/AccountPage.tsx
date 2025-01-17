import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";
import { UserRoundPlus } from "lucide-react";
import WorkspaceVisibility from "../../components/AccountPage/WorkspaceVisibility";
import { useRef, useState } from "react";
import ModalDeleteWorkspace from "../../components/AccountPage/ModalDeleteWorkspace";

export default function AccountPage(){
    const {workspaces} = useWorkspace();
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    if(!workspace){
        return <div>Workspace not found</div>
    }

    return(
        <div className=" flex-1 h-full flex flex-col py-4 px-4 md:px-8 max-w-7xl mx-auto w-full  text-gray-500 overflow-y-auto ">
            <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200 ">
                    <UserRoundPlus  />
                    Invitar a miembros del espacio de trabajo
                </button>
            </WorkspaceInfo>
            <div className="flex flex-col py-6 gap-6 ">
                <h2 className="text-slate-700 font-semibold text-xl">Ajustes del Espacio de trabajo</h2>
                <WorkspaceVisibility />
                <div className="py-4 flex flex-col gap-4">
                    <h3 className="text-slate-700 font-semibold text-xl">Invita a los miembros a unirse</h3>
                    
                </div>
                <div className="relative ">
                    <button ref={buttonRef} onClick={handleOpenModal} className="text-red-700 font-semibold hover:underline ">
                        ¿Eliminar este Espacio de trabajo?
                    </button>
                    <ModalDeleteWorkspace isOpen={isModalOpen} onClose={handleCloseModal} buttonRef={buttonRef} />
                </div>
                
                
            </div>
        </div>
    )
}