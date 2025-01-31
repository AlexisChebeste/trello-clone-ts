import { AppDispatch, store } from "../../redux/store";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/states/authSlice";
import { LogOut } from "lucide-react";
import { persistStore } from "redux-persist";


export default function Logout() {
    const dispatch = useDispatch<AppDispatch>();

    const logOut = () =>{
        dispatch(logout());
        persistStore(store).purge(); 
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