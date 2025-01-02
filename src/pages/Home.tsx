
import { useState } from "react";
import AsideWorkspace from "../components/AsideWorkspace";
import Boards from "../components/Boards";
import { X } from "lucide-react";

interface HomeProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export function Home({isMenuOpen, setIsMenuOpen}: HomeProps) {
    const [idWorkspace, setIdWorkspace] = useState<string>("");


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            {
                isMenuOpen && (
                    <div 
                        className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50" 
                        onClick={toggleMenu}>
                            <X className="absolute top-6 right-6 text-white cursor-pointer" size={24}/>
                    </div>
            )}
            <main className=" p-6  w-full  overflow-y-auto lg:flex lg:gap-6">
                <AsideWorkspace 
                    setIdWorkspace={setIdWorkspace}
                    className={`fixed lg:static top-0 left-0 h-full z-50 transform transition-transform ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
                />
                <div className="p-6 bg-white rounded-lg shadow-md w-full">
                    {(idWorkspace === "") ? 
                        <h1 className="font-bold text-2xl">Selecione un espacio de trabajo</h1>
                    : <Boards  idWorkspace={idWorkspace}/>}
                    
                </div>
            </main>
        </>
        
    )
}