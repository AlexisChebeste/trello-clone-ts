import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  children: React.ReactNode; // Contenido del sidebar
  className?: string; // Clases adicionales
}

const Sidebar = ({ children, className }:SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`flex ${
        isCollapsed ? "min-w-7" : "min-w-64"
      } transition-all duration-500  ${className} h-auto  relative border-r border-slate-300/60`}
    >
      {/* Contenido del Sidebar */}
      {!isCollapsed && <div className="flex-1 h-full ">
        {children}
      </div>}

      {/* Botón para contraer/expandir */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-[-16px] bg-blue-600 text-white p-1  rounded-full shadow-lg hover:bg-blue-800 transition-all duration-500 z-50 border border-slate-400" 
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft  />}
      </button>
    </div>
  );
};

export default Sidebar;
