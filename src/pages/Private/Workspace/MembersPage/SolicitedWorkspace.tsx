import { useParams } from "react-router";
import ButtonWorkspace from "../../../../components/ButtonWorkspace";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";


export default function SolicitedWorkspace() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!workspace){
        return <div>Workspace not found</div>
    }

    return (
        <div className="flex-1">
            <h3 className="text-slate-700 font-semibold text-xl">Solicitudes de unión ({workspace.members?.length})</h3>
            <p className="text-slate-600 text-sm mt-2 mb-4">
                Estas personas han solicitado unirse a este Espacio de trabajo. Si añades nuevos miembros al Espacio de trabajo, la facturación se actualizará automáticamente. Los invitados del Espacio de trabajo ya cuentan para el límite de colaboradores del Espacio de trabajo gratuito.
            </p>
            <div className="flex flex-col gap-4 border-y border-slate-300 py-4">
                <input type="text" placeholder="Filtrar por nombre" className="text-sm text-slate-700 placeholder:text-slate-500 py-2 px-3 border border-slate-500 rounded-sm hover:bg-slate-100 w-max md:w-60"/>
            </div>
            <div className="flex flex-col ">
                        
                {workspace.members?.length ?? 0 > 0 ? workspace.members?.map((member) => (
                    <div className="flex flex-col md:flex-row justify-between items-center gap-5 border-b border-b-slate-300 py-4">
                    <div className="flex items-center gap-4 ">
                        <div  className="size-10 rounded-full bg-sky-400" />
                        <div className="flex flex-col flex-1">
                            <span className=" text-slate-800 font-semibold">{member.name}</span>
                            <span className="text-sm text-slate-500">{member.email} • Invitado del espacio de trabajo</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <p className="text-sm text-slate-500 max-w-60">
                            Solicitud enviado el 12 de agosto de 2021
                        </p>
                        <ButtonWorkspace className=" px-4">
                            Añadir al espacio de trabajo
                        </ButtonWorkspace>
                        <ButtonWorkspace>
                            <X className="size-4"/>
                        </ButtonWorkspace>
                    </div>
                    
                    
                </div>
                )):
                    <div className="py-8 text-gray-700 border-b border-b-slate-300 flex items-center justify-center text-sm italic">No hay solicitudes para unirse.</div>
                
                }
            </div>
        </div>
    )
}