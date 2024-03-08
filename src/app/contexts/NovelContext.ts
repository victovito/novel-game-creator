import React, { createContext, useContext } from "react";
import Novel from "../interfaces/Novel";

export interface NovelContextType {
    novel: Novel;
    setNovel: React.Dispatch<React.SetStateAction<Novel>>
}

const NovelContext = createContext<NovelContextType | undefined>(undefined);

export function useNovelContext(): NovelContextType {
    const context = useContext(NovelContext);
    return context;
}

export default NovelContext;
