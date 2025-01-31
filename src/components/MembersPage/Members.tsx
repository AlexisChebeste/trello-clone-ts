import { IUser} from "../../types";
import MemberCard from "./MemberCard";

interface MembersProps{
    members: IUser[]
}

export default function Members({members}: MembersProps){
    return(
        
        <div className="flex flex-col ">
            
            {members?.map((member, index) => (
                <MemberCard key={index} member={member}/>
            ))}
            {members.length === 0 && 
                <div className="text-slate-600 text-sm p-8 border-y border-y-gray-300 text-center italic">
                    No hay miembros en este espacio de trabajo
                </div>
            }
        </div>
    )
}