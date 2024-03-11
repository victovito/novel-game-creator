import React, { useEffect, useState } from 'react';
import { useNovelFileContext } from '../../contexts/NovelFileContext';
import { parseNovel } from '../../engine/NovelParser';
import NovelObject from '../../engine/structural/NovelObject';
import ReaderPause from './ReaderPause';
import ReaderMain from './ReaderMain';
import ReaderContextWrapper from '../../contexts/reader/ReaderContextWrapper';
import { usePausedContext } from '../../contexts/reader/PausedContext';
import { useNavigate } from 'react-router-dom';

function NovelReader() {
    const {novelFile, setNovelFile} = useNovelFileContext();
    const [novel, setNovel] = useState<NovelObject>();
    const {paused, setPaused} = usePausedContext();
    
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
        parseNovel(novelFile.content, (novel, error) => {
            if (error) {
                console.error(error);
                return;
            }
            setNovel(novel);
        });
        const interval = setInterval(() => {
            api.checkForNovelUpdate(novelFile.path, novelFile.content);
        }, 500);
        return () => clearTimeout(interval);
    }, [novelFile]);

    useEffect(() => {
        if (novel) {
            novel.events.gotoBlock.subscribe((block) => {
                // do something
            })
        }
    }, [novel]);

    return (
        <div className='novel-reader'>
            {!paused ? <ReaderMain /> : <ReaderPause /> }
        </div>
    );
}

export default NovelReader;