import React, { useEffect } from 'react';
import ReaderToolbar from './ReaderToolbar';
import { useNovelContext } from '../contexts/reader/NovelContext';
import NovelState from '../engine/objects/NovelState';
import { useStateContext } from '../contexts/reader/StateContext';
import BlockRender from './render/BlockRender';
import Choice from '../engine/scopes/Choice';

function NovelRender() {
    const {novel, setNovel} = useNovelContext();
    const {state, setState} = useStateContext();

    function setUpEvents() {
        if (!novel) return;

        state.onNext(() => {
            setState(state.nextState());
        });

        novel.events.clear();
        novel.events.gotoBlock.subscribe((block) => {
            setState(state.fromBlock(block.reference));
        });
        novel.events.playSound.subscribe((sound) => {
            console.log("playing " + sound);
        });
        novel.events.stopSound.subscribe((sound) => {
            console.log("stopping " + sound);
        });
    }

    function next() {
        if (state.currentTextOrChoice instanceof Choice) return;
        state.next();
    }

    useEffect(() => {
        if (!novel) return;
        const newState = new NovelState(novel, state?.data);
        setState(newState);
    }, [novel]);

    useEffect(() => {
        if (state) {
            if (!state.novel) {
                setState(new NovelState(novel, state.data));
            } else {
                setUpEvents();
                if (state.currentCommand) {
                    next();
                    novel.run(state.currentCommand);
                }
            }
        } else {
            setState(new NovelState(novel));
        }
    }, [state]);

    useEffect(setUpNextListeners(next), [state, novel]);

    return (
        <div className='reader-main' onClick={next}>
            <ReaderToolbar />
            {state && novel ? (
                <BlockRender state={state} />
            ) : <></>}
        </div>
    );
}

export default NovelRender;

function setUpNextListeners(next: () => void) {
    return () => {
        const keyupListener = (event: KeyboardEvent) => {
            if (event.code == "Space") {
                next();
            }
        }
        document.addEventListener("keyup", keyupListener);
        return () => {
            document.removeEventListener("keyup", keyupListener);
        };
    }
}
