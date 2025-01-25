import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../../models/routes";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";


export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logOut = () =>{
        navigate(`/${PublicRoutes.LOGIN}`, {replace:true});
        dispatch(logOut)
        
    }


    return(
        <button onClick={logOut} className="border bg-white  text-gray-700 border-slate-500 hover:bg-slate-200   font-semibold p-2 h-max my-auto rounded-md  transition-colors " >
            <div className="flex items-center ">
                <LogOut  className="size-4 "/>
                <span className="ml-2 text-sm ">Cerrar sesión</span>
            </div>
        </button>
    )

}