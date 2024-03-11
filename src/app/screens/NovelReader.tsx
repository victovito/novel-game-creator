import React, { useEffect, useState } from 'react';
import ReaderToolbar from '../components/ReaderToolbar';
import { useNovelFileContext } from '../contexts/NovelFileContext';
import { parseNovel } from '../engine/NovelParser';
import NovelObject from '../engine/structural/NovelObject';

function NovelReader() {
    const {novelFile, setNovelFile} = useNovelFileContext();
    const [novel, setNovel] = useState<NovelObject>();

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
            <ReaderToolbar />
            <p>{novel ? novel.title : 'failed'}</p>
        </div>
    );
}

export default NovelReader;