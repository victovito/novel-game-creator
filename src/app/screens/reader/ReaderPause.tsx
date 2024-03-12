import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MenuButton';
import ToolbarButton from '../../components/ToolbarButton';

import leftArrowIcon from '../../assets/icons/Left_Arrow.svg';
import { usePausedContext } from '../../contexts/reader/PausedContext';
import { useStateContext } from '../../contexts/reader/StateContext';

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
                <ToolbarButton icon={leftArrowIcon} onPress={() => setPaused(false)} />
            </div>
            <MenuButton text='Restart novel' onPress={restart} />
            <MenuButton text='Exit to menu' onPress={goToMenu} />
        </div>
    );
}

export default ReaderPause;