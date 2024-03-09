import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import MainMenu from './screens/MainMenu';
import NovelReader from './screens/NovelReader';
import ReaderPause from './screens/ReaderPause';
import ContextWrapper from './contexts/ContextWrapper';

function NovelGame() {
    return (
        <ContextWrapper>
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
        </ContextWrapper>
    );
}

export default NovelGame;