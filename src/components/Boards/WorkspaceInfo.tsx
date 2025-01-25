import { FolderLock } from "lucide-react";

interface WorkspaceInfoProps{
    logo: string;
    name: string;
    isPublic: boolean;
    children?: React.ReactNode;
    description?: string;
}

export function WorkspaceInfo({logo,isPublic,name, description, children} : WorkspaceInfoProps){
    return(
    <div className='flex  flex-col lg:flex-row lg:justify-between lg:items-center border-b gap-4 border-b-slate-300 pb-8'>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center ">
                <div className={`size-16 rounded-lg text-white font-bold text-3xl relative`}>
                    <img src={logo} alt={name} className='w-full h-full rounded-lg' />
                    <span className=" absolute inset-0  text-white flex items-center justify-center">{name.charAt(0).toUpperCase()}</span>
                </div>
                <div className='flex flex-col text-gray-700 gap-1'>
                    <h1 className='text-xl font-semibold'>{name }</h1>
                    <p className='text-gray-500 text-xs flex gap-1 items-center'><FolderLock className='size-4'/>{
                        isPublic ? 'Público' : 'Privado'
                    }</p>
                </div>
            </div>
            {description && <p>{description}</p>}
        </div>
        

        {children}
    </div>

    )
}