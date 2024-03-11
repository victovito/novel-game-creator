import React, { PropsWithChildren, useEffect, useState } from 'react';

import INovelFileContext from '../interfaces/INovelFileContext';
import ISoundContext from '../interfaces/ISoundContext';

import NovelFileContext from './NovelFileContext';
import SoundContext from './SoundContext';

function ContextWrapper({ children }: PropsWithChildren) {
    const [novel, setNovel] = useState<INovelFileContext | undefined>(initNovel);
    const [sound, setSound] = useState<ISoundContext>(initSound);

    useEffect(() => {
        novel && localStorage.setItem("novel-context", JSON.stringify(novel));
    }, [novel]);

    useEffect(() => {
        sound && localStorage.setItem("sound-context", JSON.stringify(sound));
    }, [sound]);

    return (
        <NovelFileContext.Provider value={{ novelFile: novel, setNovelFile: setNovel }}>
            <SoundContext.Provider value={{ sound, setSound }}>
                {children}
            </SoundContext.Provider>
        </NovelFileContext.Provider>
    );
}

export default ContextWrapper;

function initNovel(): INovelFileContext | undefined {
    const novel = localStorage.getItem("novel-context");
    return novel ? JSON.parse(novel) : undefined;
}

function initSound(): ISoundContext | undefined {
    const sound = localStorage.getItem("sound-context");
    return sound ? JSON.parse(sound) : { enabled: true, level: 1 };
}
