import React from 'react';
import NovelState from '../../engine/objects/NovelState';
import DialogRender from './DialogRender';

type props = {
    state: NovelState,
};

function BlockRender({ state }: props) {
    const dialog = state.currentDialog;
    const dialogIndex = state.currentBlock.renderElements.indexOf(dialog);

    return (
        <div className='render-block'>
            <div className="block-content">
                <DialogRender state={state} dialog={dialog} key={dialogIndex} />
            </div>
        </div>
    );
}

export default BlockRender;