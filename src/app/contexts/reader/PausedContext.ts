import React, { createContext, useContext } from "react";

export interface PauseContextType {
    paused: boolean;
    setPaused: React.Dispatch<React.SetStateAction<boolean>>
}

const PausedContext = createContext<PauseContextType | undefined>(undefined);

export function usePausedContext(): PauseContextType {
    const context = useContext(PausedContext);
    return context;
}

export default PausedContext;
