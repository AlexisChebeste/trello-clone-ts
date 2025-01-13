import { CircleHelp, X } from "lucide-react";
import { User } from "../../types";
import ButtonWorkspace from "../ButtonWorkspace";

interface MemberCardProps{
    member: User
}

export default function MemberCard({member}:MemberCardProps){


    return(
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 border-b border-b-slate-300 py-4">
            <div className="flex items-center gap-4 ">
                <div  className="size-10 rounded-full bg-sky-400" />
                <div className="flex flex-col flex-1">
                    <span className=" text-slate-800 font-semibold">{member.name}</span>
                    <span className="text-sm text-slate-500">{member.email} • Última actividad: January 2025</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <ButtonWorkspace>
                    Ver tableros ({member.boards?.length || 0})
                </ButtonWorkspace>
                <ButtonWorkspace>
                    Administrador <CircleHelp className="size-4"/>
                </ButtonWorkspace>
                <ButtonWorkspace>
                    <X className="size-4"/> Dejar... 
                </ButtonWorkspace>
            </div>
            
            
        </div>
    )
}