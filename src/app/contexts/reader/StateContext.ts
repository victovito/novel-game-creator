import React, { createContext, useContext } from "react";
import NovelState from "../../engine/objects/NovelState";

export interface StateContextType {
    state: NovelState;
    setState: React.Dispatch<React.SetStateAction<NovelState>>
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function useStateContext(): StateContextType {
    const context = useContext(StateContext);
    return context;
}

export default StateContext;
