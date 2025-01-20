import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";


export default function Layout() {
    
    return(
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-1 overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}