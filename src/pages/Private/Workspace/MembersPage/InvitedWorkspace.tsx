import Members from "../../../../components/MembersPage/Members";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";


export default function InvitedWorkspace() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    if(!workspace){
        return <div>Workspace not found</div>
    }

    return (
        <div className="flex-1">
            <h3 className="text-slate-700 font-semibold text-xl">Invitados ({workspace.boards?.length})</h3>
            <p className="text-slate-600 text-sm mt-2 mb-4">
                Los invitados solo pueden ver y editar los tableros a los que se les haya añadido.

            </p>
            {workspace.members && workspace.members.length > 0 ? (
                <div>
                    <div className="py-6 border-t border-t-gray-300">
                        <h3 className="text-slate-700 font-semibold text-xl">Invitados de un solo tablero ({workspace.boards?.length})</h3>
                        <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  mt-4">
                            <p className="text-slate-600 text-sm w-full">Los invitados de un solo tablero son miembros de un único tablero del Espacio de trabajo.</p>
                            
                        </div>
                    </div>
                
                    <Members members={workspace.members} />
                </div>
                
            ) : (
                <div className="py-4 text-gray-700 border-y border-y-slate-300 flex items-center justify-center text-sm italic">No hay ningún invitado en este Espacio de trabajo.</div>
            )}
            
        </div>
    )
}