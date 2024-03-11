import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MenuButton';
import ToolbarButton from '../../components/ToolbarButton';

import leftArrowIcon from '../../assets/icons/Left_Arrow.svg';
import { usePausedContext } from '../../contexts/reader/PausedContext';

function ReaderPause() {
    const {paused, setPaused} = usePausedContext();
    const navigate = useNavigate();

    return (
        <div className='reader-pause'>
            <div className="return-button">
                <ToolbarButton icon={leftArrowIcon} onPress={() => setPaused(false)} />
            </div>
            <MenuButton text='Exit to menu' onPress={() => navigate("/")} />
        </div>
    );
}

export default ReaderPause;