import React from 'react';
import NovelState from '../../engine/objects/NovelStateManager';
import Text from '../../engine/expressions/Text';
import Question from '../../engine/scopes/Question';
import TextRender from './TextRender';

type props = {
    state: NovelState
};

function DialogRender({ state }: props) {
    const dialog = state.currentDialog;
    const renderElements = dialog?.renderElements;

    function getElement(index: number) {
        const element = renderElements[index];
        const show = index <= state.data.block.dialog.childIndex;
        if (element instanceof Text) {
            return <TextRender show={show} state={state} text={element} key={index} />;
        } if (element instanceof Question) {
            return <div>Question</div>;
        } else {
            return <div>unknown</div>;
        }
    }
    
    function getElements() {
        const elements = [];
        for (let i = 0; i < renderElements.length; i++) {
            if (!state.currentTextOrQuestion) break;
            elements.push(getElement(i));
        }
        return elements;
    }

    if (dialog) {
        return (
            <div className='render-dialog'>
                {dialog.speaker ? <span className='speaker'>{dialog.speaker}:</span> : <></>}
                {getElements()}
            </div>
        );
    } else {
        return (<></>);
    }
}

export default DialogRender;