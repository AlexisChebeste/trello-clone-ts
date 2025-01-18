import { useParams } from "react-router";
import { useWorkspace } from "../../hooks/useWorkspace";
import { WorkspaceInfo } from "../../components/Boards/WorkspaceInfo";
import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import SectionSubscription from "../../components/BillingPage/SectionSubscription";
import SectionCategory from "../../components/BillingPage/SectionCategory";
import TableSub from "../../components/BillingPage/TableSub";

export default function BillingPage(){
    const {workspaces} = useWorkspace();
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [isMensual, setIsMensual] = useState(true);

    if(!workspace){
        return (<div>Workspace not found</div>)
    }

    return(
        <div className=" flex-1 h-full flex flex-col py-4  max-w-7xl mx-auto w-full  text-gray-500">
            <div className="px-4 md:px-8">
                <WorkspaceInfo logo={workspace.logo} name={workspace.name} description={workspace.description}>
                    <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md flex items-center font-semibold max-w-max gap-2  hover:bg-blue-700 transition-colors duration-200 relative">
                        <UserRoundPlus  />
                        Invitar a miembros del espacio de trabajo
                    </button>
                </WorkspaceInfo>
            </div>
            <article className="flex flex-col max-w-7xl py-6 gap-6   w-full items-center  mx-auto  ">
                <header className="flex flex-col">
                    <h2 className="text-slate-700 font-semibold text-xl text-center">Mejora la suscripción de Trello de Espacio de trabajo de Trello</h2>
                </header>
                    
                <section className="flex flex-col md:flex-row gap-2 items-center justify-center text-slate-600">
                    <p>Ciclo de facturación:</p>
                    <p className={`${isMensual && 'font-semibold text-slate-800'}`}>Mensual</p>
                    <button className={`bg-green-400 w-8 p-0.5 rounded-full flex items-center `} onClick={()=> setIsMensual(!isMensual)}><div className={`size-3 bg-white stroke-none rounded-full ${isMensual ? 'translate-x-0' : 'translate-x-4'} transition-all duration-300 ease-in-out`}  /></button>
                    <p className={`${!isMensual && 'font-semibold text-slate-800'}`}>Anual</p>
                    <span className="text-white bg-blue-600 font-semibold text-xs py-1 px-2 rounded-sm">AHORRA UN 20 %</span>
                </section>

                <article className="flex flex-col gap-4 w-full items-center  lg:hidden">
                    <SectionSubscription isMensual={isMensual} />
                    <SectionCategory/>
                </article>
                <section className="hidden lg:block gap-4 w-full items-center">
                    <TableSub isMensual={isMensual}/>
                </section>

            </article>
            
        </div>
    )
}