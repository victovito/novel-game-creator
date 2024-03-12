import React from 'react';
import NovelState from '../../engine/objects/NovelStateManager';
import DialogRender from './DialogRender';

type props = {
    state: NovelState
};

function BlockRender({ state }: props) {
    return (
        <div className='render-block'>
            <div className="block-content">
                <DialogRender state={state} />
            </div>
        </div>
    );
}

export default BlockRender;