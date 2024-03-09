import React, { createContext, useContext } from "react";
import INovelContext from "../interfaces/INovelContext";

export interface NovelContextType {
    novel: INovelContext;
    setNovel: React.Dispatch<React.SetStateAction<INovelContext>>
}

const NovelContext = createContext<NovelContextType | undefined>(undefined);

export function useNovelContext(): NovelContextType {
    const context = useContext(NovelContext);
    return context;
}

export default NovelContext;
