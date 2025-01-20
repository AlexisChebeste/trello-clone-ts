import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../utilities/localStorage.utility";
import { resetUser, UserKey } from "../../redux/states/user";
import { PublicRoutes } from "../../models/routes";


export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () =>{
        clearLocalStorage(UserKey);
        dispatch(resetUser())
        navigate(PublicRoutes.LOGIN, {replace:true});
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