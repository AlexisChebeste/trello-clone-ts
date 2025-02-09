import { Trello, UserRound } from "lucide-react";
import WorkspaceLink from "./WorkspaceLink";
import { ModalAccount } from "./ModalAccount";

interface AsideHeaderProps {
    idWorkspace: string;
    selectedWorkspace: {
        name: string;
        plan: string;
        logo: string;
    };
    userInWorkspace?: boolean;
}

export default function AsideHeader({idWorkspace, selectedWorkspace,userInWorkspace}: AsideHeaderProps) {

    return(
        <div>
            <div className='flex  gap-2 border-b border-slate-300/30 py-3 px-4 items-center w-full '>
                <div className={`flex  justify-center items-center h-10 w-12  rounded-md  text-white font-bold text-xl relative`}>
                    <img src={`/public${selectedWorkspace.logo}`} alt={`${selectedWorkspace.name} logo`}  className='size-full rounded-md'/>
                    <span className='absolute inset-0 flex items-center justify-center'>{selectedWorkspace.name[0].toUpperCase()}</span>
                </div>
                <div className="flex flex-col   w-full ">
                    <h2 className="text-md   font-semibold">{selectedWorkspace?.name}</h2>
                    <p className={`text-xs ${!userInWorkspace ? "opacity-0 ": "opacity-100"}`}>{selectedWorkspace.plan}</p>
                </div>
            </div>
            {userInWorkspace && (
                <div className='flex flex-col   pt-3'>
                    <div className='flex w-full'>
                        <WorkspaceLink idWorkspace={idWorkspace} title='Tableros'>
                        <Trello className="size-4"/>
                        </WorkspaceLink>
                    </div>
                    <div className='flex w-full'>
                        <WorkspaceLink idWorkspace={idWorkspace} dir='/members' title='Miembros'>
                        <UserRound className="size-4"/>
                        </WorkspaceLink>
                    </div>
                    <ModalAccount idWorkspace={idWorkspace}/>
                </div>
            )}
            
        </div>
    )
}