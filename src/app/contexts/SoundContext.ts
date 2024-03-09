import React, { createContext, useContext } from "react";
import ISoundContext from "../interfaces/ISoundContext";

export interface SoundContextType {
    sound: ISoundContext;
    setSound: React.Dispatch<React.SetStateAction<ISoundContext>>
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function useSoundContext(): SoundContextType {
    const context = useContext(SoundContext);
    return context;
}

export default SoundContext;
