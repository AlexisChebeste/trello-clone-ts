import { useSelector } from "react-redux";
import AsideWorkspace from "../../components/Home/AsideWorkspace";
import { RootState } from "../../redux/store";
import Layout from "../Layout";
import WorkspaceContent from "../../components/UserPage/WorkspaceContent";
import { IWorkspace } from "../../types";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";


export default function UserBoards() {
    const {user} = useSelector((state: RootState) => state.auth);
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const [workspaceBoards, setWorkspaceBoards] = useState<IWorkspace[]>([]);

    

    useEffect(() => {
        const fetchWorkspacesBoards = async () => {
            if (!user) return;
            const response = await axiosInstance.get(`/workspaces/workspaces-info`);
            setWorkspaceBoards(response.data);
            
        }
        fetchWorkspacesBoards()
    }, []);



    if (!user) return null;
    return (
        <Layout>
            <main className=" p-1 sm:p-2 lg:p-3 w-full max-w-7xl   sm:flex gap-2 lg:gap-3 transition-all ">
                <AsideWorkspace />    
                <div className="p-2 lg:p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
                    <h2 className="text-lg font-bold text-slate-700 ">TUS ESPACIOS DE TRABAJO</h2>

                    {workspaces.length === 0  ? (
                        <p className=" text-sm  text-slate-600">
                        Todavía no eres miembro de ningún Espacio de trabajo.
                        <span className="text-blue-600 hover:underline font-semibold">Crea un Espacio de trabajo</span>
                    </p>
                    ): (
                        <div className="flex flex-col gap-10">
                            {workspaces.map(workspace => (
                                <WorkspaceContent key={workspace.id} workspace={workspace} showAddBoard={true} />
                            ))}
                        </div>
                    )}
                    {workspaceBoards.length > 0 && (
                        <>
                            <h2 className="pt-6 text-lg font-bold text-slate-700 ">ESPACIOS DE TRABAJO EN LOS QUE ERES INVITADO
                            </h2>
                            <div className="flex flex-col gap-10">
                                {workspaceBoards.map(workspace => (
                                    <WorkspaceContent key={workspace.id} workspace={workspace} showAddBoard={false} />
                                ))}
                            </div>
                        </>
                    )}

                </div>
            </main>
        </Layout>
    )
}