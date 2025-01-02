import { NavLink } from "react-router";
import {LogOut, Menu} from "lucide-react";

interface NavbarProps {
    onMenuToggle: () => void;
}

export default function Navbar({onMenuToggle}: NavbarProps) {

    return(
        <header className="bg-white shadow-sm max-h-16 w-full z-10 ">
            <nav className=" px-6  ">
                <div className="flex justify-between h-16">
                    <div className="flex gap-4">
                        <button
                            className="lg:hidden   rounded-md hover:bg-gray-100"
                            onClick={onMenuToggle}
                        >
                            <Menu size={24} />
                        </button>
                        <NavLink to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">TrelloClone</span>
                        </NavLink>
                        
                    </div>
                    <div className="flex items-center" >
                        <NavLink to="/login" className="border border-gray-300 hover:bg-zinc-800 hover:text-white  font-bold p-3 rounded-md  transition-colors " onClick={() => console.log("New Board")}>
                            <div className="flex items-center ">
                                <LogOut  className="size-4"/>
                                <span className="ml-2 text-sm ">Log Out</span>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}