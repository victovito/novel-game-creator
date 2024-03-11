import React, { createContext, useContext } from "react";
import INovelFileContext from "../interfaces/INovelFileContext";

export interface NovelFileContextType {
    novelFile: INovelFileContext;
    setNovelFile: React.Dispatch<React.SetStateAction<INovelFileContext>>
}

const NovelFileContext = createContext<NovelFileContextType | undefined>(undefined);

export function useNovelFileContext(): NovelFileContextType {
    const context = useContext(NovelFileContext);
    return context;
}

export default NovelFileContext;
