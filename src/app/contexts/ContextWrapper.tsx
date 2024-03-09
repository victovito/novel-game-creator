import React, { PropsWithChildren, useEffect, useState } from 'react';

import INovelContext from '../interfaces/INovelContext';
import ISoundContext from '../interfaces/ISoundContext';

import NovelContext from './NovelContext';
import SoundContext from './SoundContext';

function ContextWrapper({ children }: PropsWithChildren) {
    const [novel, setNovel] = useState<INovelContext | undefined>(initNovel);
    const [sound, setSound] = useState<ISoundContext>(initSound);

    useEffect(() => {
        novel && localStorage.setItem("novel-context", JSON.stringify(novel));
    }, [novel]);

    useEffect(() => {
        sound && localStorage.setItem("sound-context", JSON.stringify(sound));
    }, [sound]);

    return (
        <NovelContext.Provider value={{ novel, setNovel }}>
            <SoundContext.Provider value={{ sound, setSound }}>
                {children}
            </SoundContext.Provider>
        </NovelContext.Provider>
    );
}

export default ContextWrapper;

function initNovel(): INovelContext | undefined {
    const novel = localStorage.getItem("novel-context");
    return novel ? JSON.parse(novel) : undefined;
}

function initSound(): ISoundContext | undefined {
    const sound = localStorage.getItem("sound-context");
    return sound ? JSON.parse(sound) : { enabled: true, level: 1 };
}
