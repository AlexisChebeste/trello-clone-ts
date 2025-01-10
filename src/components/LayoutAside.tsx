import { Outlet, useParams } from "react-router";
import AsideBoards from "./Aside/AsideBoards";


export default function LayoutAside(){
    const {idWorkspace} = useParams()

    return(
        <div className="flex h-full ">
            <AsideBoards 
                idWorkspace={idWorkspace || ''} 
                className="text-slate-600" 
            />
            <main className="flex-1 h-full">
                {/* Aquí va el contenido de la página */}
                <Outlet/>
            </main>
        </div>
    )
}