import React, { useState } from 'react';

import NovelState from '../../engine/objects/NovelState';
import Text from '../../engine/expressions/Text';
import Choice from '../../engine/scopes/Choice';

import TextRender from './TextRender';
import ChoiceRender from './ChoiceRender';
import Value from '../../engine/values/Value';

type props = {
    state: NovelState
};

function DialogRender({ state }: props) {
    const dialog = state.currentDialog;
    const orderedElements = dialog?.orderedElements;

    function getElement(index: number): React.JSX.Element {
        const element = orderedElements[index];
        const show = index <= state.data.block.dialog.childIndex;
        if (element instanceof Text) {
            return <TextRender show={show} state={state} text={element} key={index} />;
        } if (element instanceof Choice) {
            return <ChoiceRender show={show} state={state} choice={element} key={index} />;
        }
    }
    
    function getElements() {
        const elements = [];
        for (let i = 0; i < orderedElements.length; i++) {
            if (state.currentTextOrChoice) {
                elements.push(getElement(i));
            }
        }
        return elements;
    }

    function getSpeaker() {
        let speaker = dialog.speaker;
        dialog.variables.forEach(variable => {
            const value = state.novel.getVariable(variable.value);
            if (value && value instanceof Value) {
                speaker = speaker.replace(`{$${variable.value}}`, value.value);
            }
        });
        return speaker;
    }

    if (dialog) {
        return (
            <div className='render-dialog'>
                {dialog.speaker ? <span className='speaker'>{getSpeaker()}:</span> : <></>}
                {getElements()}
            </div>
        );
    } else {
        return (<></>);
    }
}

export default DialogRender;