import { X } from "lucide-react";
import ButtonWorkspace from "../../ButtonWorkspace";
import { UserProfile } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { acceptInvitation, rejectInvitation } from "../../../redux/states/workspacesSlices";

interface ButtonOptionMemberProps {
    user: UserProfile;
    idWorkspace: string;
}


export default function ButtonOptionMember({user, idWorkspace}: ButtonOptionMemberProps){
    const dispatch = useDispatch<AppDispatch>();

    if(!user || !idWorkspace) return null;

    

    return (
        <>
            
        </>
    )
}