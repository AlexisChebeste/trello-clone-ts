import { createContext, useState } from "react";

interface ColorContextProps {
    color: string;
    setColor: (color: string) => void;
}

export const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
    const [color, setColor] = useState("bg-blue-500");

    return (
        <ColorContext.Provider value={{ color, setColor }}>
            {children}
        </ColorContext.Provider>
    );
}

