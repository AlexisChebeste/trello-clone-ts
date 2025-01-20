import { NavLink, useLocation, } from "react-router";
import { useColor } from "../../hooks/useColor";
import Logout from "./Logout";

export default function Navbar() {
    const location = useLocation();
    const isBoardPage = location.pathname.includes("b/");
    const {color} = useColor()
    
    return(
        <header 
            className={` border-b 
                ${isBoardPage ? 
                    `${color} border-b-slate-200/30 drop-shadow-md backdrop-blur-sm shadow-sm ` 
                : ' border-b-slate-300/60'} 
                h-14 w-full z-10 `
            }>
            <nav className={`${isBoardPage ?  'bg-black/30 ': ''}`}>
                <div className="flex justify-between h-14 px-6">
                    <div className='flex gap-4 '>
                        
                        
                        <NavLink 
                            to="/w/1/home" 
                            className= {`flex-shrink-0 flex gap-1 items-center ${isBoardPage ?'text-white' :'text-slate-600'}`}
                        >
                            <span className='text-base font-bold '>
                                TrelloClone
                            </span>
                        </NavLink>
                        
                    </div>
                    
                    <Logout/>
                </div>
            </nav>
        </header>
    )
}