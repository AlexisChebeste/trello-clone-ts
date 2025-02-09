import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function ModalAccount({idWorkspace}: {idWorkspace: string}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);
    const isBoardPage = location.pathname.includes("b/");
    const isActive = (path: string) => location.pathname === path;
    return(
        <div className="flex w-full relative ">
            <button className={`flex items-center justify-between w-full text-sm font-semibold pl-4 pr-2 ${isBoardPage ? 'hover:bg-white/10' : 'hover:bg-gray-100'} py-2`} onClick={toggleModal}>
                <Settings className="size-4"/>
                Ajustes del espacio de trabajo
                <ChevronDown className="size-4" />
            </button>
            {isOpen && (
                <div 
                    className="absolute top-10 left-0 w-72 bg-white shadow-md rounded-md border border-gray-200 flex flex-col py-2 text-gray-600 z-50"
                    style={{
                        maxWidth: "calc(100vw - 16px)", // Asegura que no sobresalga de la pantalla
                    }}
                    onClick={toggleModal}
                >
                    <Link to={`/w/${idWorkspace}/account`} className={`w-full text-sm font-medium hover:bg-gray-200 py-2 px-4 ${isActive(`/w/${idWorkspace}/account`) ? 'bg-gray-600 text-white hover:text-gray-700' : ''}`}>Ajustes del Espacio de trabajo</Link>
                    <Link to={`/w/${idWorkspace}/belling`} className={`w-full text-sm font-medium hover:bg-gray-200  py-2 px-4 ${isActive(`/w/${idWorkspace}/belling`) ? 'bg-gray-600 text-white hover:text-gray-700' : ''}`}>Ampliar el Espacio de trabajo</Link>
                </div>
                
            )}
        </div>
    )
}