import React, { createContext, useContext } from "react";
import { INovelState } from "../../engine/objects/NovelStateManager";

export interface StateContextType {
    state: INovelState;
    setState: React.Dispatch<React.SetStateAction<INovelState>>
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function useStateContext(): StateContextType {
    const context = useContext(StateContext);
    return context;
}

export default StateContext;
