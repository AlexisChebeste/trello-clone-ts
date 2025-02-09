import React from "react";

interface ButtonWorkspaceProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabledButton?: boolean;
}

const ButtonWorkspace = React.forwardRef<HTMLButtonElement, ButtonWorkspaceProps>(
    ({ children, className, onClick ,disabledButton}, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                disabled={disabledButton}
                className={`flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-300 py-2 px-3 rounded-md text-slate-800 font-semibold text-sm w-max ${className}`}
            >
                {children}
            </button>
        );
    }
);

export default ButtonWorkspace;
