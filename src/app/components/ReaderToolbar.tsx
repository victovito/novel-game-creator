import React from 'react';
import ToolbarButton from './ToolbarButton';
import { useSoundContext } from '../contexts/SoundContext';

import menuIcon from "../assets/icons/Menu.svg";
import soundOnIcon from "../assets/icons/Sound_On.svg";
import soundOffIcon from "../assets/icons/Sound_Off.svg";
import { usePausedContext } from '../contexts/reader/PausedContext';

function ReaderToolbar() {
    const {sound, setSound} = useSoundContext();
    const {setPaused} = usePausedContext();
    
    function toogleSound() {
        setSound({
            enabled: !sound.enabled,
            level: sound.level
        });
    }

    return (
        <div className='reader-toolbar'>
            <ToolbarButton icon={sound.enabled ? soundOnIcon : soundOffIcon} onPress={toogleSound} />
            <ToolbarButton icon={menuIcon} onPress={() => setPaused(true)} />
        </div>
    );
}

export default ReaderToolbar;