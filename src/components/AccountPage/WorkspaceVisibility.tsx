import { Globe, LockKeyhole} from "lucide-react";
import ButtonWorkspace from "../ButtonWorkspace";
import { useState, useRef} from "react";
import ModalVisibility from "./ModalVisibility";
import { useDispatch } from "react-redux";
import { updatePublicWorkspace } from "../../redux/states/workspaceSlices";
import { IWorkspace } from "../../types";

export default function WorkspaceVisibility({workspace}: {workspace: IWorkspace}) {
  const dispatch= useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

    const handdleOpen = () => {
        setIsOpen(true);
    }

  const handleVisibility = () => {
    setIsOpen(false);
  };

  const setIsPublic = (isPublic: boolean) => {
    dispatch(updatePublicWorkspace({ id: workspace.id, isPublic }));
    handleVisibility();
  }




  return (
    <div className=" flex flex-col md:flex-row gap-4 md:space-between items-center py-4 border-t border-t-gray-300">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-2">
          {workspace.isPublic ? (
            <Globe className="size-4 text-gray-700" />
          ) : (
            <LockKeyhole className="size-4 text-gray-700" />
          )}
          <h3 className="text-base font-semibold text-slate-800">
            {workspace.isPublic ? "Público" : "Privado"}
          </h3>
        </div>
        <p className="text-sm text-gray-700 text-wrap">
          {workspace.isPublic
            ? "Este Espacio de trabajo es público. Lo puede ver cualquier persona que acceda al enlace y aparecerá en los resultados de buscadores como Google. Solo las personas invitadas al Espacio de trabajo pueden añadir o editar los tableros del Espacio de trabajo."
            : "Este Espacio de trabajo es privado. No está indexado para las personas que no pertenezcan al Espacio de trabajo, y no lo podrán ver."}
        </p>
      </div>
      <div className="w-full md:w-40 flex flex-col items-center md:items-end z-50">
        <div className="relative">
            <ButtonWorkspace ref={buttonRef} onClick={handdleOpen}>
            Cambiar
            </ButtonWorkspace>
        </div>
        
        <ModalVisibility
            buttonRef={buttonRef}
            isOpen={isOpen}
            onClose={handleVisibility}
            setIsPublic={setIsPublic}
        />
      </div>
    </div>
  );
}