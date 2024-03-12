import React from 'react';
import NovelStateManager from '../../engine/objects/NovelStateManager';
import Text from '../../engine/expressions/Text';
import Question from '../../engine/scopes/Question';
import TextRender from './TextRender';

type props = {
    stateManager: NovelStateManager
};

function DialogRender({ stateManager }: props) {
    const dialog = stateManager.currentDialog;
    const renderElements = dialog?.renderElements;

    function getElement(index: number) {
        const element = renderElements[index];
        const show = index <= stateManager.state.block.dialog.childIndex;
        if (element instanceof Text) {
            return <TextRender show={show} stateManager={stateManager} text={element} key={index} />;
        } if (element instanceof Question) {
            return <div>Question</div>;
        } else {
            return <div>unknown</div>;
        }
    }
    
    function getElements() {
        const elements = [];
        for (let i = 0; i < renderElements.length; i++) {
            if (!stateManager.currentTextOrQuestion) break;
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