import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MenuButton';
import IconButton from '../../components/IconButton';

import { usePausedContext } from '../../contexts/reader/PausedContext';
import { useStateContext } from '../../contexts/reader/StateContext';

import backIcon from '../../assets/icons/arrow-left.svg';

function ReaderPause() {
    const {setPaused} = usePausedContext();
    const {setState} = useStateContext();
    const navigate = useNavigate();

    function restart() {
        setState(undefined);
        setPaused(false);
    }

    function goToMenu() {
        // well at least i tried
        sessionStorage.setItem("reader-paused", JSON.stringify(false));
        navigate("/");
    }

    return (
        <div className='reader-pause menu'>
            <div className="return-button">
                <IconButton icon={backIcon} onPress={() => setPaused(false)} />
            </div>
            <MenuButton text='Restart novel' onPress={restart} />
            <MenuButton text='Exit to menu' onPress={goToMenu} />
        </div>
    );
}

export default ReaderPause;