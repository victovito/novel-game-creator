import React from 'react';

import { useSoundContext } from '../contexts/SoundContext';
import { usePausedContext } from '../contexts/reader/PausedContext';
import { useNovelContext } from '../contexts/reader/NovelContext';

import IconButton from './IconButton';

import menuIcon from "../assets/icons/menu.svg";
import soundOnIcon from "../assets/icons/volume-2.svg";
import soundOffIcon from "../assets/icons/volume-x.svg";

function ReaderToolbar() {
    const {novel} = useNovelContext();
    const {sound, setSound} = useSoundContext();
    const {setPaused} = usePausedContext();
    
    function toogleSound() {
        const newSound = {
            enabled: !sound.enabled,
            level: sound.level
        };
        novel.audioManager.globalLevel = newSound.enabled ? newSound.level : 0;
        setSound(newSound);
    }

    return (
        <div className='reader-toolbar'>
            <IconButton icon={sound.enabled ? soundOnIcon : soundOffIcon} onPress={toogleSound} />
            <IconButton icon={menuIcon} onPress={() => setPaused(true)} />
        </div>
    );
}

export default ReaderToolbar;