import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  label: string;
}

export default function Dropdown({ options, selected, onChange, label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 ">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="relative w-full ">
        {/* Botón principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-2  text-sm bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>{options.find((o) => o.value === selected)?.label || "Selecciona una opción"}</span>
          <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"} ml-2 size-5`} />
        </button>

        {/* Lista desplegable */}
        {isOpen && (
          <ul className="absolute  w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded-md"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

