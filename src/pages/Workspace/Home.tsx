import AsideWorkspace from "../../components/Home/AsideWorkspace";
import Boards from "../../components/Boards/Boards";
import { X } from "lucide-react";

interface HomeProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function Home({isMenuOpen, setIsMenuOpen}: HomeProps) {
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            {isMenuOpen && (
                <div 
                    className="fixed top-0 left-0 w-full h-full bg-gray-800 sm:hidden bg-opacity-50 z-30" 
                    onClick={toggleMenu}
                >
                        
                    <X className="absolute right-1 top-4 text-white cursor-pointer " size={24}/>
                </div>
            )}
            <main className=" p-1 sm:p-2 lg:p-3 w-full max-w-7xl   sm:flex gap-2 lg:gap-3 transition-all">
                <AsideWorkspace 
                    className={`fixed sm:static top-0 left-0 h-full z-40 transform transition-transform ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`}
                />
                <div className="p-2 lg:p-6 flex-1">
                    <Boards />
                    
                </div>
            </main>
        </>
        
    )
}