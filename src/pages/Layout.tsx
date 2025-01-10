import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

interface LayoutProps {
    onMenuToggle: () => void;
}

export default function Layout({onMenuToggle}: LayoutProps) {
    
    return(
        <div className='flex flex-col h-screen'>
            <Navbar onMenuToggle={onMenuToggle}  />
            <div className='flex-1 overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}