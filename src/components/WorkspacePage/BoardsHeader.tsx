import { useState, useEffect } from 'react'
import Dropdown from './Dropdown'


interface BoardsHeaderProps {
  onSortChange: (value: string) => void
  onSearchChange: (value: string) => void
  sortBy: string
  searchQuery: string
}
const optionsOrder = [
  { value: "most-recent", label: "Más activo recientemente" },
  { value: "least-recent", label: "Menos activo recientemente" },
  { value: "a-z", label: "En orden alfabético de la A a la Z" },
  { value: "z-a", label: "En orden alfabético de la Z a la A" },
];

const optionsFilter = [
  { value: "", label: "Elegir una colección" },
  { value: "all", label: "Todas las colecciones" },
];

export default function BoardsHeader({ onSortChange, onSearchChange, sortBy, searchQuery }: BoardsHeaderProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchQuery, onSearchChange]);

  return (
    <div className="space-y-4 bg-white pb-4 sticky top-0 z-10 border-b">
      <h1 className="text-2xl font-bold">Tableros</h1>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:justify-start">
      
        <Dropdown options={optionsOrder} selected={sortBy} onChange={onSortChange} label='Ordenar por'  />

        <Dropdown options={optionsFilter} selected={sortBy} onChange={onSortChange} label='Filtrar por'  />

        <div className="space-y-2 max-w-56">
          <label className="text-sm text-gray-600">Buscar</label>
          <input
            type="search"
            placeholder="Buscar tableros"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )
}
