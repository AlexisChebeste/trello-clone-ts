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
      isCollapsed ? "w-7" : "w-64 max-w-72"
      } transition-all duration-500 ${className} h-full max-h-[calc(100vh - 3rem)]  border-r border-slate-300/30 z-10`}
    >
      {/* Contenido del Sidebar */}
      {!isCollapsed && (
      <div className="flex flex-col flex-1 h-full w-max">
        {children}
      </div>
      )}

      {/* Botón para contraer/expandir */}
      <button
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
      className="absolute top-4 right-[-16px] bg-blue-600 text-white p-1 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-500 z-10 border border-slate-400"
      >
      {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </div>
  );
};

export default Sidebar;
