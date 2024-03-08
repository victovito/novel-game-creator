import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import NovelContext from './contexts/NovelContext';
import SoundContext from './contexts/SoundContext';
import Novel from './interfaces/Novel';
import Sound from './interfaces/Sound';

import MainMenu from './screens/MainMenu';
import NovelReader from './screens/NovelReader';
import ReaderPause from './screens/ReaderPause';

function NovelGame() {
    const [novel, setNovel] = useState<Novel | undefined>();
    const [sound, setSound] = useState<Sound>({ enabled: true, level: 1 });

    return (
        <NovelContext.Provider value={{ novel, setNovel }}>
        <SoundContext.Provider value={{ sound, setSound }}>
            <div className='novel-game-main'>
                <div className="content">
                    <Routes>
                        <Route path='' element={<MainMenu />} />
                        <Route path='novel' element={<Outlet />}>
                            <Route path='' element={<NovelReader />} />
                            <Route path='pause' element={<ReaderPause />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </SoundContext.Provider>
        </NovelContext.Provider>
    );
}

export default NovelGame;