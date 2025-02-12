import { useParams } from "react-router";
import ButtonWorkspace from "../../../../components/ButtonWorkspace";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { UserProfile } from "../../../../types";
import { useDispatch } from "react-redux";
import { acceptInvitation, rejectInvitation } from "../../../../redux/states/workspacesSlices";



export default function SolicitedWorkspace() {
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {workspaces} = useSelector((store: RootState) => store.workspaces);
    const workspace = workspaces.find((workspace) => workspace.id === idWorkspace);
    const [activityUsers, setActivityUsers] = useState<Record<string, UserProfile>>({});
    
    if(!workspace || !idWorkspace){
        return <div>Workspace not found</div>
    }


    useEffect(() => {
        const fetchUsers = async () => {
            if(!workspace) return;

            setActivityUsers({}); // Limpiar usuarios anteriores

            const userIds = Array.from(new Set(workspace.invitations.map((a) => a.user))); // Obtener IDs únicos
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
    }, []);

    const handleAccept = async (user: UserProfile) => {
        await dispatch(acceptInvitation({id: idWorkspace, userId: user.id}));
    }

    const handleDecline = async (user: UserProfile) => {
        await dispatch(rejectInvitation({id: idWorkspace, userId: user.id}));
    }

    return (
        <div className="flex-1">
            <h3 className="text-slate-700 font-semibold text-xl">Solicitudes de unión ({workspace.invitations.length})</h3>
            <p className="text-slate-600 text-sm mt-2 mb-4">
                Estas personas han solicitado unirse a este Espacio de trabajo. Si añades nuevos miembros al Espacio de trabajo, la facturación se actualizará automáticamente. Los invitados del Espacio de trabajo ya cuentan para el límite de colaboradores del Espacio de trabajo gratuito.
            </p>
            <div className="flex flex-col gap-4 border-y border-slate-300 py-4">
                <input type="text" placeholder="Filtrar por nombre" className="text-sm text-slate-700 placeholder:text-slate-500 py-2 px-3 border border-slate-500 rounded-sm hover:bg-slate-100 w-max md:w-60"/>
            </div>
            <div className="flex flex-col ">
                        
                {workspace.invitations?.length ?? 0 > 0 ? workspace.invitations.map((member,index) => {
                    const user = activityUsers[member.user];
                    if(!user) return null;
                    return(
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 border-b border-b-slate-300 py-4" key={index}>
                        <div className="flex items-center gap-4 ">
                            <img src={user.avatar} alt={user.name} className="size-12 rounded-full"/>
                            <div className="flex flex-col flex-1">
                                <span className=" text-slate-800 font-semibold">{user.name}</span>
                                <span className="text-sm text-slate-500">{user.email} • Invitado del espacio de trabajo</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 items-center">
                            <p className="text-sm text-slate-500 max-w-60">
                                Solicitud enviada el {new Date(member.dateSolicited).toDateString()}
                            </p>
                            <ButtonWorkspace className=" px-4"
                                onClick={() => handleAccept(user)}
                            >
                                Añadir al espacio de trabajo
                            </ButtonWorkspace>
                            <ButtonWorkspace
                                onClick={() => handleDecline(user)}
                            >
                                <X className="size-4"/>
                            </ButtonWorkspace>
                        </div>
                    
                    
                    </div>
                    )
                }
                    
                ):
                    <div className="py-8 text-gray-700 border-b border-b-slate-300 flex items-center justify-center text-sm italic">No hay solicitudes para unirse.</div>
                
                }
            </div>
        </div>
    )
}