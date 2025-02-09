import { CircleHelp, X } from "lucide-react";
import { IUser } from "../../types";
import ButtonWorkspace from "../ButtonWorkspace";

interface MemberCardProps{
    member: IUser
    plan: string
}

export default function MemberCard({member,plan}:MemberCardProps){


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
                <ButtonWorkspace>
                    Ver tableros ({member.boards?.length || 0})
                </ButtonWorkspace>
                <ButtonWorkspace className={`${plan === "Gratuito" && "opacity-40"}`} disabledButton={plan === "Gratuito"}>
                    Administrador <CircleHelp className="size-4"/>
                </ButtonWorkspace>
                <ButtonWorkspace>
                    <X className="size-4"/> Dejar... 
                </ButtonWorkspace>
            </div>
            
            
        </div>
    )
}