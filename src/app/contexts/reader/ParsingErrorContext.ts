import React, { createContext, useContext } from "react";
import Novel from "../../engine/objects/Novel";
import NovelParsingError from "../../engine/errors/parsing/NovelParsingError";

export interface ParsingErrorContextType {
    error: NovelParsingError;
    setError: React.Dispatch<React.SetStateAction<NovelParsingError>>
}

const ParsingErrorContext = createContext<ParsingErrorContextType | undefined>(undefined);

export function useParsingErrorContext(): ParsingErrorContextType {
    const context = useContext(ParsingErrorContext);
    return context;
}

export default ParsingErrorContext;
