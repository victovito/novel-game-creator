import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import GlobalContextWrapper from './contexts/GlobalContextWrapper';
import ReaderContextWrapper from './contexts/reader/ReaderContextWrapper';

import MainMenu from './screens/MainMenu';
import NovelReader from './screens/reader/NovelReader';
import ReaderEntry from './screens/reader/ReaderEntry';
import NovelRender from './screens/reader/NovelRender';
import ReaderPause from './screens/reader/ReaderPause';

function NovelGame() {
    const reader = <ReaderContextWrapper><NovelReader /></ReaderContextWrapper>
    return (
        <GlobalContextWrapper>
            <div className='novel-game-main'>
                <div className="content">
                    <Routes>
                        <Route path='' element={<MainMenu />} />
                        <Route path='reader' element={reader}>
                            <Route path='' element={<ReaderEntry />} />
                            <Route path='novel' element={<Outlet />}>
                                <Route path='' element={<NovelRender />} />
                                <Route path='pause' element={<ReaderPause />} />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </GlobalContextWrapper>
    );
}

export default NovelGame;