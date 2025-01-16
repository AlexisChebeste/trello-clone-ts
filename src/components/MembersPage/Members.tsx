import { User} from "../../types";
import MemberCard from "./MemberCard";

interface MembersProps{
    members: User[]
}

export default function Members({members}: MembersProps){
    return(
        
        <div className="flex flex-col ">
            
            {members?.map((member) => (
                <MemberCard key={member.id} member={member}/>
            ))}
        </div>
    )
}