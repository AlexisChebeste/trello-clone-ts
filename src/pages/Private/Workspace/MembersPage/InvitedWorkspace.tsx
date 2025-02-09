import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { UserProfile } from "../../../../types";
import axiosInstance from "../../../../api/axiosInstance";
import ButtonWorkspace from "../../../../components/ButtonWorkspace";
import { X } from "lucide-react";


export default function InvitedWorkspace() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [activityUsers, setActivityUsers] = useState<Record<string, UserProfile>>({});
    
    if(!workspace){
        return <div>Workspace not found</div>
    }


    useEffect(() => {
        const fetchUsers = async () => {
            if(!workspace) return;

            setActivityUsers({}); // Limpiar usuarios anteriores

            const userIds = Array.from(new Set(workspace.invitedGuests.map((a) => a.user))); // Obtener IDs únicos
            const userPromises = userIds.map(async (userId) => {
                const response = await axiosInstance.get<UserProfile>(`/user/${userId}`);
                return { userId, userProfile: response.data };
            });

            const usersData = await Promise.all(userPromises);
            const usersMap: Record<string, UserProfile> = {};
            usersData.forEach(({ userId, userProfile }) => {
                usersMap[userId] = userProfile;
            });

            setActivityUsers(usersMap);
        };

        fetchUsers();
    }, [workspace.invitedGuests]);

    return (
        <div className="flex-1">
            <h3 className="text-slate-700 font-semibold text-xl">Invitados ({workspace.invitedGuests?.length})</h3>
            <p className="text-slate-600 text-sm mt-2 mb-4">
                Los invitados solo pueden ver y editar los tableros a los que se les haya añadido.

            </p>
            {workspace.invitedGuests && workspace.invitedGuests.length > 0 ? (
                <div>
                    <div className="py-6 border-t border-t-gray-300">
                        <h3 className="text-slate-700 font-semibold text-xl">Invitados a tableros del Espacio de trabajo ({workspace.invitedGuests?.length})</h3>
                        <div className="flex flex-col md:flex-row gap-4 md:space-between items-center  mt-4">
                            <p className="text-slate-600 text-sm w-full">Los invitados de un solo tablero son miembros de un único tablero del Espacio de trabajo.</p>
                        </div>
                    </div>
                
                    <div className="flex flex-col ">
                        
                        {workspace.invitedGuests?.length ?? 0 > 0 ? workspace.invitedGuests.map((member,index) => {
                            const user = activityUsers[member.user];
                            return(
                                <div className="flex flex-col md:flex-row justify-between items-center gap-5 border-b border-b-slate-300 py-4" key={index}>
                                <div className="flex items-center gap-4 ">
                                    <img src={user.avatar} alt={user.name} className="size-12 rounded-full"/>
                                    <div className="flex flex-col flex-1">
                                        <span className=" text-slate-800 font-semibold">{user.name}</span>
                                        <span className="text-sm text-slate-500">{user.email} • Invitado del espacio de trabajo</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 items-center">
                                    <ButtonWorkspace className=" px-4">
                                        Tableros {member.boards.length}
                                    </ButtonWorkspace>
                                    <ButtonWorkspace className=" px-4">
                                        Añadir al espacio de trabajo
                                    </ButtonWorkspace>
                                    <ButtonWorkspace className="gap-2">
                                        <X className="size-4"/>
                                        Quitar...
                                    </ButtonWorkspace>
                                </div>
                            
                            
                            </div>
                            )
                        }):
                            <div className="py-8 text-gray-700 border-b border-b-slate-300 flex items-center justify-center text-sm italic">No hay solicitudes para unirse.</div>
                        
                        }
                    </div>
                </div>
                
            ) : (
                <div className="py-4 text-gray-700 border-y border-y-slate-300 flex items-center justify-center text-sm italic">No hay ningún invitado en este Espacio de trabajo.</div>
            )}
            
        </div>
    )
}