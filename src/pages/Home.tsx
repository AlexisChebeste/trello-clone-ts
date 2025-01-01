
import { useState } from "react";
import AsideWorkspace from "../components/AsideWorkspace";
import Boards from "../components/Boards";

export function Home() {
    const [idWorkspace, setIdWorkspace] = useState<string>("");

    return (
        <main className=" p-6  w-full  overflow-y-auto lg:flex lg:gap-6">
            <AsideWorkspace setIdWorkspace={setIdWorkspace}/>
            <div className="p-6 bg-white rounded-lg shadow-md w-full">
                {(idWorkspace === "") ? 
                    <h1 className="font-bold text-2xl">Selecione un espacio de trabajo</h1>
                : <Boards  idWorkspace={idWorkspace}/>}
                
            </div>
        </main>
    )
}