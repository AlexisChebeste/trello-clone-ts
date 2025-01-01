import { NavLink } from "react-router";
import {LogOut} from "lucide-react";

export default function Navbar() {

    return(
        <header className="bg-white shadow-sm max-h-16 w-full z-10 ">
            <nav className=" px-4 sm:px-6 ">
                <div className="flex justify-between h-16">
                    <div className="flex">
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