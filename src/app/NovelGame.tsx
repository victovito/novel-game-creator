import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import MainMenu from './screens/MainMenu';
import NovelReader from './screens/reader/NovelReader';
import GlobalContextWrapper from './contexts/GlobalContextWrapper';
import ReaderContextWrapper from './contexts/reader/ReaderContextWrapper';

function NovelGame() {
    return (
        <GlobalContextWrapper>
            <div className='novel-game-main'>
                <div className="content">
                    <Routes>
                        <Route path='' element={<MainMenu />} />
                        <Route path='reader' element={
                            <ReaderContextWrapper>
                                <NovelReader />
                            </ReaderContextWrapper>
                        } />
                    </Routes>
                </div>
            </div>
        </GlobalContextWrapper>
    );
}

export default NovelGame;