import { User} from "../../types";
import MemberCard from "./MemberCard";

interface MembersProps{
    members: User[]
}

export default function Members({members}: MembersProps){
    return(
        
        <div className="flex flex-col ">
            <div className="border-y border-slate-300 py-4">
                <input type="text" placeholder="Filtrar por nombre" className="text-sm text-slate-700 placeholder:text-slate-500 py-2 px-3 border border-slate-500 rounded-sm hover:bg-slate-100"/>
            </div>
            {members?.map((member) => (
                <MemberCard key={member.id} member={member}/>
            ))}
        </div>
    )
}