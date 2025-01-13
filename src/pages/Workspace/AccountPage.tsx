import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import ButtonWorkspace from "../../components/ButtonWorkspace";

export default function AccountPage(){
    const {workspaces} = useWorkspace();
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);

    if(!workspace){
        return <div>Workspace not found</div>
    }

    return(
        <div className="flex flex-col py-6 gap-6">
            <h2 className="text-slate-700 font-semibold text-xl">Ajustes del Espacio de trabajo</h2>
            
            <div className="py-4 flex flex-col gap-4">
                <h3 className="text-slate-700 font-semibold text-xl">Invita a los miembros a unirse</h3>
                <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  py-4 border-t border-t-gray-300">
                    <p className="text-slate-600 text-sm w-full">  Privado – Este Espacio de trabajo es privado. No está indexado para las personas que no pertenezcan al Espacio de trabajo, y no lo podrán ver.</p>
                    <div className="w-full md:w-72 lg:w-96 flex  flex-col items-end ">
                        <ButtonWorkspace>
                            Cambiar
                        </ButtonWorkspace>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}