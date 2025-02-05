import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface ModalBoardProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  height: number;
  className?: string;
  leftAdd?: number;
  topAdd?: number;
}

export default function ModalGeneric({
  isOpen,
  onClose,
  buttonRef,
  children,
  height,
  className,
  leftAdd,
  topAdd,
}: ModalBoardProps) {
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);
  const [isReady, setIsReady] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const modalWidth = 300;
      const modalHeight = height;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let left = buttonRect.left + (leftAdd ?? 0);
      let top = buttonRect.top + (topAdd ?? 0); ;

      if (left + modalWidth > screenWidth) {
        left = screenWidth - modalWidth - 10;
      }
      if (top + modalHeight > screenHeight) {
        top = buttonRect.top - modalHeight;
      }

      if (top < 0) top = 10;
      if (left < 0) left = 10;

      if (modalPosition?.top !== top || modalPosition?.left !== left) {
        setModalPosition({ top, left });
      }
    }
  }, [buttonRef, height, leftAdd]);

  useLayoutEffect(() => {
    if (isOpen) {
      handleResize();
      setIsReady(true); // Marca que la posición ya fue calculada

      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      window.addEventListener("resize", handleResize);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousedown", handleClickOutside);
        setIsReady(false); // Resetea la visibilidad cuando se cierra
      };
    }
  }, [isOpen, handleResize, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      id="modal-board"
      ref={modalRef}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-hidden={!isOpen ? "true" : "false"}
      className={`absolute bg-white flex flex-col justify-between rounded-lg shadow-lg py-4 border border-slate-200 gap-2 text-slate-600 z-50 transition-opacity duration-150 ease-out ${className}`}
      style={{
        top: modalPosition?.top ?? 0,
        left: modalPosition?.left ?? 0,
        width: "300px",
        opacity: isReady ? 1 : 0, // Oculta el modal hasta que se calcule la posición
      }}
    >
      {children}
    </div>,
    document.body
  );
}
