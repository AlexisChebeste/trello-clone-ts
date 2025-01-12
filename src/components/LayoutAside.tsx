import { Outlet, useParams } from "react-router";
import AsideBoards from "./Aside/AsideBoards";


export default function LayoutAside(){
    const {idWorkspace} = useParams()

    return(
        <div className="flex-1 w-full flex h-full  overflow-hidden">
            <AsideBoards 
                idWorkspace={idWorkspace || ''} 
                className="text-slate-600" 
            />
            <main className="flex-1 flex h-full">
                {/* Aquí va el contenido de la página */}
                <Outlet/>
            </main>
        </div>
    )
}