import { NavLink, useLocation } from "react-router";
import {LogOut, Menu} from "lucide-react";

interface NavbarProps {
    onMenuToggle: () => void;
}

export default function Navbar({onMenuToggle}: NavbarProps) {
    const location = useLocation();
    const isBoardPage = location.pathname.includes("board");

    return(
        <header className={` border-b ${isBoardPage ?  'bg-black/30 drop-shadow-md backdrop-blur-sm shadow-sm  border-b-slate-200/30' : ' border-b-slate-300/60'}  h-16 w-full z-10 `}>
            <nav className=" px-6  ">
                <div className="flex justify-between h-16">
                    <div className='flex gap-4 '>
                        <button
                            className={isBoardPage ? 'hidden' : "sm:hidden  "}
                            onClick={onMenuToggle}
                        >
                            <Menu size={24} className="hover:scale-110 text-slate-600"/>
                        </button>
                        
                        <NavLink to="/" className="flex-shrink-0 flex items-center">
                            <span className={`text-xl font-bold ${isBoardPage ?'text-white' :'text-slate-600'}`}>TrelloClone</span>
                        </NavLink>
                        
                    </div>
                    <div className="flex items-center" >
                        <NavLink to="/login" className="border bg-white  text-gray-700 border-slate-500 hover:bg-slate-200   font-semibold p-3 rounded-md  transition-colors " onClick={() => console.log("New Board")}>
                            <div className="flex items-center ">
                                <LogOut  className="size-4 "/>
                                <span className="ml-2 text-sm ">Cerrar sesión</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}