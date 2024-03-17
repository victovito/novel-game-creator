import React, { useEffect, useState } from 'react';

import { useNovelFileContext } from '../../contexts/NovelFileContext';
import { useNovelContext } from '../../contexts/reader/NovelContext';
import { usePausedContext } from '../../contexts/reader/PausedContext';

import { parseNovel } from '../../engine/NovelParser';
import Novel from '../../engine/objects/Novel';

import ReaderPause from './ReaderPause';
import NovelRender from './NovelRender';
import { useSoundContext } from '../../contexts/SoundContext';
import { useStateContext } from '../../contexts/reader/StateContext';
import NovelError from '../../engine/errors/NovelError';
import ReaderEntry from './ReaderEntry';
import { Outlet } from 'react-router-dom';
import { useParsingErrorContext } from '../../contexts/reader/ParsingErrorContext';

function NovelReader() {
    const {novelFile, setNovelFile} = useNovelFileContext();
    const {sound} = useSoundContext();
    const {novel, setNovel} = useNovelContext();
    const {paused} = usePausedContext();
    const {setState} = useStateContext();
    const {error, setError} = useParsingErrorContext();
    const loading = !novel && !error;

    function onNovelParsed(novel: Novel) {
        setState(undefined);
        setError(undefined);
        setNovel(novel);
    }

    function onNovelParsingError(error: NovelError) {
        setError(error);
    }
    
    useEffect(() => {
        api.onNovelUpdated((content) => {
            setNovelFile({
                path: novelFile.path,
                content: content
            });
        });
    }, []);

    useEffect(() => {
        if (!novelFile) return;
        parseNovel(novelFile.content, novelFile.path).then(onNovelParsed).catch(onNovelParsingError);
    }, [novelFile]);

    useEffect(() => {
        if (!novel) return;
        novel.audioManager.globalLevel = sound.enabled ? sound.level : 0;
    }, [novel]);

    return (
        <div className='novel-reader'>
            {!loading ? <Outlet /> : <div>Loading...</div>}
        </div>
    );
}

export default NovelReader;