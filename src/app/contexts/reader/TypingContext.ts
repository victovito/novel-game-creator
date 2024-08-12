import React, { createContext, useContext } from "react";

export interface TypingContextType {
    typing: boolean;
    setTyping: React.Dispatch<React.SetStateAction<boolean>>
}

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export function useTypingContext(): TypingContextType {
    const context = useContext(TypingContext);
    return context;
}

export default TypingContext;
