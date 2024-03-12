import React, { useEffect, useRef, useState } from 'react';
import ReaderToolbar from './ReaderToolbar';
import { useNovelContext } from '../contexts/reader/NovelContext';
import NovelStateManager from '../engine/objects/NovelStateManager';
import { useStateContext } from '../contexts/reader/StateContext';
import Text from '../engine/expressions/Text';
import BlockRender from './render/BlockRender';
import Question from '../engine/scopes/Question';

function NovelRender() {
    const {novel, setNovel} = useNovelContext();
    const {state, setState} = useStateContext();
    const [stateManager, setStateManager] = useState<NovelStateManager>();

    function next() {
        if (stateManager.currentTextOrQuestion instanceof Question) return;
        stateManager.nextTextOrQuestion();
        setStateManager(new NovelStateManager(novel, stateManager.state));
        setState({...stateManager.state});
    }

    useEffect(() => {
        if (!novel) return;
        const newState = new NovelStateManager(novel, state);
        setStateManager(newState);
        setState({...newState.state});
    }, [novel]);

    useEffect(setUpNextListeners(next), [state,stateManager,novel]);

    return (
        <div className='reader-main' onClick={next}>
            <ReaderToolbar />
            {stateManager && novel ? (
                <BlockRender stateManager={stateManager} />
            ) : <></>}
        </div>
    );
}

export default NovelRender;

function setUpNextListeners(next: () => void) {
    return () => {
        const keyupListener = (event: KeyboardEvent) => {
            if (event.code == "Space") {
                next()
            }
        }
        document.addEventListener("keyup", keyupListener);
        return () => {
            document.removeEventListener("keyup", keyupListener);
        };
    }
}
