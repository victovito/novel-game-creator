import React from 'react';
import NovelStateManager from '../../engine/objects/NovelStateManager';
import DialogRender from './DialogRender';

type props = {
    stateManager: NovelStateManager
};

function BlockRender({ stateManager }: props) {
    return (
        <div className='render-block'>
            <div className="block-content">
                <DialogRender stateManager={stateManager} />
            </div>
        </div>
    );
}

export default BlockRender;