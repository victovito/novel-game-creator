import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MenuButton';
import IconButton from '../../components/IconButton';

import { usePausedContext } from '../../contexts/reader/PausedContext';
import { useStateContext } from '../../contexts/reader/StateContext';

import backIcon from '../../assets/icons/arrow-left.svg';
import { useNovelContext } from '../../contexts/reader/NovelContext';

function ReaderPause() {
    const {novel} = useNovelContext();
    const {setPaused} = usePausedContext();
    const {setState} = useStateContext();
    const navigate = useNavigate();

    function unpause() {
        novel.audioManager.resumeAll();
        setPaused(false);
    }

    function restart() {
        novel.audioManager.stopAll();
        setState(undefined);
        setPaused(false);
    }

    function goToMenu() {
        // well at least i tried
        sessionStorage.setItem("reader-paused", JSON.stringify(false));
        navigate("/");
    }

    useEffect(() => novel.audioManager.pauseAll(), []);

    return (
        <div className='reader-pause menu'>
            <div className="return-button">
                <IconButton icon={backIcon} onPress={unpause} />
            </div>
            <MenuButton text='Restart novel' onPress={restart} />
            <MenuButton text='Exit to menu' onPress={goToMenu} />
        </div>
    );
}

export default ReaderPause;