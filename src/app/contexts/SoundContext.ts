import React, { createContext, useContext } from "react";
import Sound from "../interfaces/Sound";

export interface SoundContextType {
    sound: Sound;
    setSound: React.Dispatch<React.SetStateAction<Sound>>
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function useSoundContext(): SoundContextType {
    const context = useContext(SoundContext);
    return context;
}

export default SoundContext;
