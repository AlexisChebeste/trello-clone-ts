import { Invitations } from "../../types";
import {  AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { solicitInvitation } from "../../redux/states/workspacesSlices";


export default function SoliciteInvitation({usersInvitations}:{usersInvitations: Invitations[]}) {
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector((store : RootState) => store.auth)
    const {selectedBoard} = useSelector((store : RootState) => store.boards)

    const isInvited = usersInvitations.some((u) => u.user === user?.id)

    if(selectedBoard?.idWorkspace === undefined) return null

    const handdleRequestInvitation = async() => {
        await dispatch(solicitInvitation(selectedBoard?.idWorkspace))
    }


    return(
        <div className=" flex items-center justify-center p-1 text-slate-800 ">
            {isInvited ? (
                <div className='  flex  items-center gap-2 flex-col w-full bg-gray-100 rounded-md  p-3 text-xs'>
                    <p><span className=" font-bold">Has solicitado unirte a este Espacio de trabajo.</span> Si un administrador del Espacio de trabajo aprueba su solicitud, verá otros tableros de este Espacio de trabajo aquí.</p>
                </div>
            )  : 
                <div className='  flex  items-center gap-2 flex-col w-full bg-gray-100 rounded-md  p-3 text-center text-xs'>
                    <h3 className=' font-bold  0'>Eres un invitado en este Espacio de trabajo.</h3>
                    <p >
                        Para ver más tableros y miembros de este Espacio de trabajo, es necesario que un administrador lo añada como miembro del Espacio de trabajo.
                    </p>
                    <button 
                        onClick={handdleRequestInvitation} 
                        aria-label='Solicitar invitación'
                        aria-labelledby='Solicitar invitación'
                        className="w-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-sm py-2 mt-2"
                    >
                        Solicitar unirse
                    </button>
                </div>
            }
            
            
        </div>
    )
}