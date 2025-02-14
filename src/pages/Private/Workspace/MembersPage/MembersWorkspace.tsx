import { Link } from "lucide-react";
import ButtonWorkspace from "../../../../components/ButtonWorkspace";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import MemberCard from "../../../../components/MembersPage/MemberCard";

export default function MembersWorkspace({setIsModalOpen}: {setIsModalOpen: (value: boolean) => void}) {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!idWorkspace || !workspace) {
        return <div>Workspace not found</div>
    }

    return (
        <div className="flex-1">
            <h3 className="text-slate-700 font-semibold text-xl">Miembros del espacio de trabajo ({workspace.members.length})</h3>
            <p className="text-slate-600 text-sm mt-2 mb-4">
                Los miembros del Espacio de trabajo pueden ver todos los tableros visibles para el Espacio de trabajo, unirse a ellos y crear nuevos tableros en el Espacio de trabajo.

            </p>
            <div className="py-6 border-t border-t-gray-300">
                <h3 className="text-slate-700 font-semibold text-xl">Invita a los miembros a unirse</h3>
                <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  mt-4">
                    <p className="text-slate-600 text-sm w-full">Cualquiera que tenga un enlace de invitación puede unirse a este Espacio de trabajo gratuito. También puedes deshabilitar y crear un nuevo enlace de invitación para este Espacio de trabajo en cualquier momento. Las invitaciones pendientes cuentan para el límite de 10 colaboradores.</p>
                    <div className="w-56  md:w-72 lg:w-96 flex  flex-col items-center md:items-end ">
                        <ButtonWorkspace onClick={() => setIsModalOpen(true)}>
                            <Link className="size-4"/>
                            Invitar mediante enlace
                        </ButtonWorkspace>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col ">
            
                {workspace.members.map((member, index) => (
                    <MemberCard key={index} member={member} plan={workspace.plan}/>
                ))}
                {workspace.members.length === 0 && 
                    <div className="text-slate-600 text-sm p-8 border-y border-y-gray-300 text-center italic">
                        No hay miembros en este espacio de trabajo
                    </div>
                }
            </div>
            
        </div>
    )
}

