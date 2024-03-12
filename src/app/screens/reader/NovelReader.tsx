import React, { useEffect, useState } from 'react';

import { useNovelFileContext } from '../../contexts/NovelFileContext';
import { useNovelContext } from '../../contexts/reader/NovelContext';
import { usePausedContext } from '../../contexts/reader/PausedContext';

import { parseNovel } from '../../engine/NovelParser';
import Novel from '../../engine/objects/Novel';
import NovelState from '../../engine/objects/NovelStateManager';
import NovelParsingError from '../../engine/errors/NovelParsingError';

import ReaderPause from './ReaderPause';
import NovelRender from '../../components/NovelRender';

function NovelReader() {
    const {novelFile, setNovelFile} = useNovelFileContext();
    const {novel, setNovel} = useNovelContext();
    const {paused, setPaused} = usePausedContext();

    function onNovelParsed(novel: Novel, error: NovelParsingError) {
        if (error) {
            console.error(error);
            return;
        }
        setNovel(novel);
    }
    
    useEffect(() => {
        api.onNovelUpdated((content) => {
            setNovelFile({
                path: novelFile.path,
                content: content
            });
        })
    }, []);

    useEffect(() => {
        if (!novelFile) return;
        parseNovel(novelFile.content, onNovelParsed);
        const interval = setInterval(() => {
            api.checkForNovelUpdate(novelFile.path, novelFile.content);
        }, 500);
        return () => clearTimeout(interval);
    }, [novelFile]);

    return (
        <div className='novel-reader'>
            {!paused ? <NovelRender /> : <ReaderPause /> }
        </div>
    );
}

export default NovelReader;