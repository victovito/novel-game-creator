import React, { useEffect, useState } from 'react';

import { useNovelContext } from '../../contexts/reader/NovelContext';
import { useStateContext } from '../../contexts/reader/StateContext';
import { useNovelFileContext } from '../../contexts/NovelFileContext';

import NovelState from '../../engine/objects/NovelState';
import Choice from '../../engine/scopes/Choice';
import NovelError from '../../engine/errors/NovelError';

import ReaderToolbar from '../../components/ReaderToolbar';
import BlockRender from '../../components/render/BlockRender';
import NovelErrorRender from '../../components/render/NovelErrorRender';

function NovelRender() {
    const {novel} = useNovelContext();
    const {state, setState} = useStateContext();
    const [errors, setErrors] = useState<NovelError[]>([]);

    function setUpEvents() {
        if (!novel) return;
    
        state.onNext(() => {
            setState(state.nextState());
        });
    
        novel.events.clear();
        novel.events.onRuntimeError.subscribe(error => {
            errors.push(error);
        });
        novel.events.gotoBlock.subscribe(block => {
            setState(state.fromBlock(block.reference));
        });
        novel.events.playSound.subscribe(audio => {
            console.log("playing " + audio.name);
        });
        novel.events.stopSound.subscribe(audio => {
            console.log("stopping " + audio.name);
        });
    }

    function next() {
        if (state.currentTextOrChoice instanceof Choice) return;
        state.next();
    }

    function onErrorClose(error: NovelError) {
        errors.splice(errors.indexOf(error), 1);
        setErrors([...errors]);
    }

    useEffect(() => {}, []);

    useEffect(() => {
        if (state) {
            if (!state.novel) {
                setState(new NovelState(novel, state.data));
            } else {
                setUpEvents();
                for (let command of state.previousCommands) {
                    novel.run(command);
                    if (command.identifier == "goto") break;
                }
                setErrors([...errors]);
            }
        } else {
            setState(new NovelState(novel));
        }
    }, [state]);

    useEffect(setUpNextListeners(next), [state, novel]);

    return (
        <div className='reader-main'>
            <ReaderToolbar />
            <div className="reader-content-container" onClick={next}>
                {state && novel ? (
                    <BlockRender state={state} />
                ) : null}
            </div>
            {errors ? (
                <NovelErrorRender errors={errors} onClose={onErrorClose} />
            ): null}
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
