import { FolderLock } from "lucide-react";

interface WorkspaceInfoProps{
    logo: string;
    name: string;
    children?: React.ReactNode;
    description?: string;
}

export function WorkspaceInfo({logo,name, description, children} : WorkspaceInfoProps){
    return(
    <div className='flex  flex-col lg:flex-row lg:justify-between lg:items-center border-b gap-4 border-b-slate-300 pb-8'>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center ">
                <div className={`py-3 px-6 ${logo} rounded-lg text-white font-bold text-4xl`}>{name[0].toUpperCase()}</div>
                <div className='flex flex-col text-gray-700 gap-1'>
                    <h1 className='text-xl font-semibold'>{name }</h1>
                    <p className='text-gray-500 text-xs flex gap-1 items-center'><FolderLock className='size-4'/>Publica</p>
                </div>
            </div>
            {description && <p>{description}</p>}
        </div>
        

        {children}
    </div>

    )
}