
import { Globe, LockKeyhole, X } from "lucide-react";
import ModalFlex from "../ModalFlexLeft";

interface ModalBoardProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  setIsPublic: (isPublic: boolean) => void;

}

export default function ModalVisibility({
  isOpen,
  onClose,
  buttonRef,
  setIsPublic,
}: ModalBoardProps) {
  

  return (
    <ModalFlex isOpen={isOpen} onClose={onClose} buttonRef={buttonRef} height={362}>
      <div className="flex justify-between items-center py-4 px-5 text-slate-800">
            <h3 className="text-sm font-semibold ml-3">
            Selecciona visibilidad del Espacio
            </h3>
            <button
            className="p-1 hover:bg-slate-200 rounded-full"
            onClick={onClose}
            >
            <X className="size-4" />
            </button>
        </div>

        <button
            className="flex flex-col gap-2 text-gray-700 hover:bg-gray-100 py-2 px-7"
            onClick={() => setIsPublic(false)}
        >
            <div className="flex items-center gap-2">
            <LockKeyhole className="size-3 text-gray-700" />
            <span>Privada</span>
            </div>
            <p className="text-xs text-start text-gray-700">
            Este Espacio de trabajo es privado. No está indexado para las personas que
            no pertenezcan al Espacio de trabajo, y no lo podrán ver.
            </p>
        </button>
        <button
            className="flex flex-col gap-2 text-gray-700 hover:bg-gray-100 py-2 px-7"
            onClick={() => setIsPublic(true)}
        >
            <div className="flex items-center gap-2">
            <Globe className="size-3 text-gray-700" />
            <span>Pública</span>
            </div>
            <p className="text-xs text-start text-gray-700">
            Este Espacio de trabajo es público. Lo puede ver cualquier persona que
            acceda al enlace y aparecerá en los resultados de buscadores como Google.
            Solo las personas invitadas al Espacio de trabajo pueden añadir o editar
            los tableros del Espacio de trabajo.
            </p>
        </button>
    </ModalFlex>
      
  )
}
