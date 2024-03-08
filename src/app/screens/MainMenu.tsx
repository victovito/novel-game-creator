import { ipcRenderer } from 'electron';
import React, { useContext, useEffect, useState } from 'react';
import MenuButton from '../components/MenuButton';
import { useNavigate } from 'react-router-dom';
import { useNovelContext } from '../contexts/NovelContext';

function MainMenu() {
    const navigate = useNavigate();
    const novelContext = useNovelContext();

    useEffect(() => {
        api.onNovelRetrieved((path, content) => {
            novelContext.setNovel({ path, content });
            navigate("novel");
        });
    }, []);

    return (
        <div className='main-menu'>
            <MenuButton text='Load novel' onPress={api.requestNovel} />
            <MenuButton text='Continue novel' disabled />
            <MenuButton text='Quit' onPress={window.close} />
        </div>
    );
}

export default MainMenu;
