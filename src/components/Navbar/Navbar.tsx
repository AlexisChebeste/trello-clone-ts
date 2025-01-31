import { NavLink, useLocation, } from "react-router";
import Logout from "./Logout";
import MenuWorkspaces from "./MenuWorkspaces";
import AddWorkspace from "./AddWorkspace";
import { PrivateRoutes } from "../../models/routes";

export default function Navbar() {
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");

    return(
        <header 
            className='border-b  border-b-slate-200/60  backdrop-blur-sm  h-14 w-full z-50'>
            <nav className={`${isBoardPage ?  'text-white bg-black/40 ' :'text-slate-600'}`}>
                <div className="flex justify-between h-14 px-6">
                    <div className='flex gap-6  items-center'>
                        
                        <NavLink 
                            to={`${PrivateRoutes.PRIVATE}`} 
                            className= {`flex-shrink-0 flex gap-1 items-center `}
                        >
                            <span className='text-xl font-bold '>
                                TrelloClone
                            </span>
                        </NavLink>
                        
                        <MenuWorkspaces />
                        
                        <AddWorkspace/>

                    </div>
                    
                    <Logout/>
                </div>
            </nav>
        </header>
    )
}