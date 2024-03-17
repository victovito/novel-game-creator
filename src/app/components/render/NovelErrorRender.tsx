import React from 'react';

import NovelError from '../../engine/errors/NovelError';
import IconButton from '../IconButton';

import closeIcon from '../../assets/icons/close.svg';

type props = {
    errors: NovelError[],
    onClose: (error: NovelError) => void
}

function NovelErrorRender({ errors, onClose }: props) {
    return (
        <div className='render-error-container'>
            <div className="render-errors">
                {errors.map((error, index) => (
                    <div className="render-error" key={index}>
                        <div className='content'>
                            <div className="message">{error.message}</div>
                            <div className="line">at line {error.line.number}</div>
                        </div>
                        <div className="close">
                            <IconButton icon={closeIcon} onPress={() => onClose(error)} size='sm' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NovelErrorRender;