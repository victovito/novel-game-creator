import React from 'react';
import IconButton from './IconButton';
import { useSoundContext } from '../contexts/SoundContext';
import { usePausedContext } from '../contexts/reader/PausedContext';

import menuIcon from "../assets/icons/menu.svg";
import soundOnIcon from "../assets/icons/volume-2.svg";
import soundOffIcon from "../assets/icons/volume-x.svg";

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
            <IconButton icon={sound.enabled ? soundOnIcon : soundOffIcon} onPress={toogleSound} />
            <IconButton icon={menuIcon} onPress={() => setPaused(true)} />
        </div>
    );
}

export default ReaderToolbar;