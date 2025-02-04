import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

interface LayoutProps {
    children?: React.ReactNode;
    className?: string;
    bgImage?: string;
}

export default function Layout({children, className, bgImage}: LayoutProps) {
    
    return(
        <div 
            className={`flex flex-col h-screen ${className}`} 
            style={
                {backgroundImage: `url(/public/${bgImage})`}
            }
        >
            <Navbar />
            <div className='flex-1 overflow-y-auto'>
                <Outlet />
                {children}
            </div>
        </div>
    )
}