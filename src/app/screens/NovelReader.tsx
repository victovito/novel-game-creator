import React, { useEffect } from 'react';
import ReaderToolbar from '../components/ReaderToolbar';
import { useNovelContext } from '../contexts/NovelContext';
import { parseNovel } from '../engine/NovelParser';

function NovelReader() {
    const {novel, setNovel} = useNovelContext();

    useEffect(() => {
        if (!novel) return;

        // parseNovel(novel.content, (novel, error) => {
        //     console.log(novel);
        // });

        const interval = setInterval(() => {
            api.checkForNovelUpdate(novel.path, novel.content);
        }, 500);
        return () => clearTimeout(interval);
    }, [novel]);

    useEffect(() => {
        api.onNovelUpdated((content) => {
            setNovel({
                path: novel.path,
                content: content
            });
        })
    }, []);

    return (
        <div className='novel-reader'>
            <ReaderToolbar />
            <p>{novel ? novel.content : 'state lost :('}</p>
        </div>
    );
}

export default NovelReader;