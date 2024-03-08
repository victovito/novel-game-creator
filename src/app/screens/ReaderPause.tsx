import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../components/MenuButton';
import ToolbarButton from '../components/ToolbarButton';

import leftArrowIcon from '../assets/icons/Left_Arrow.svg';

function ReaderPause() {
    const navigate = useNavigate();

    return (
        <div className='reader-pause'>
            <div className="return-button">
                <ToolbarButton icon={leftArrowIcon} onPress={() => navigate("..")} />
            </div>
            <MenuButton text='Exit to menu' onPress={() => navigate("/")} />
        </div>
    );
}

export default ReaderPause;