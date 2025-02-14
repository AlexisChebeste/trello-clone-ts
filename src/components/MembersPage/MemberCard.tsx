import { CircleHelp, X } from "lucide-react";
import { IUser } from "../../types";
import ButtonWorkspace from "../ButtonWorkspace";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteBoardMember, removeMember } from "../../redux/states/workspacesSlices";
import { useParams } from "react-router";
import ButtonViewBoards from "./ButtonViewBoards";

interface MemberCardProps{
    member: IUser
    plan: string
}

export default function MemberCard({member,plan}:MemberCardProps){
    const dispatch = useDispatch<AppDispatch>();
    const {idWorkspace} = useParams<{idWorkspace: string}>();
    const {user} = useSelector((store: RootState) => store.auth);


    if(!idWorkspace) return null;

    const handleRemoveMember = async() => {
        await dispatch(removeMember({id:idWorkspace, userId: member.id}));
    }

    const handleRemoveBoard = async(userId: string, boardId: string ) => {
        await dispatch(deleteBoardMember({id:idWorkspace, userId, boardId}));
    }

    return(
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 border-b border-b-slate-300 py-4">
            <div className="flex items-center gap-4 ">
                <img src={member.avatar} alt={member.name} className="size-12 rounded-full"/>
                <div className="flex flex-col flex-1">
                    <span className=" text-slate-800 font-semibold">{member.name}  {member.lastname}</span>
                    <span className="text-sm text-slate-500">{member.email}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <ButtonViewBoards 
                    boardsMember={member.boards} 
                    name={member.name} 
                    memberId={member.id} 
                    onClick={handleRemoveBoard}
                />
                <ButtonWorkspace className={`${plan === "Gratuito" && "opacity-40"}`} disabledButton={plan === "Gratuito"}>
                    Administrador <CircleHelp className="size-4"/>
                </ButtonWorkspace>
                <ButtonWorkspace 
                    onClick={handleRemoveMember}
                >
                    <X className="size-4"/> 
                    {member.id === user?.id ? "Dejar... " : "Quitar..." }
                </ButtonWorkspace>
            </div>
            
            
        </div>
    )
}