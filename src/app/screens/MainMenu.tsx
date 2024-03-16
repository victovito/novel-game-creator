import { ipcRenderer } from 'electron';
import React, { useContext, useEffect, useState } from 'react';
import MenuButton from '../components/MenuButton';
import { useNavigate } from 'react-router-dom';
import { useNovelFileContext } from '../contexts/NovelFileContext';

function MainMenu() {
    const navigate = useNavigate();
    const novelFinalContext = useNovelFileContext();

    useEffect(() => {
        api.onNovelRetrieved((path, content) => {
            navigate("reader");
            novelFinalContext.setNovelFile({ path, content });
        });
    }, []);

    return (
        <div className='main-menu menu'>
            <MenuButton text='Load novel' onPress={api.requestNovel} />
            <MenuButton text='Continue novel' disabled />
            <MenuButton text='Quit' onPress={window.close} />
        </div>
    );
}

export default MainMenu;
