import React from 'react';

type props = {
    icon: string;
    onPress?: () => void;
    disabled?: boolean;
}


function ToolbarButton({ icon, onPress, disabled}: props) {
    return (
        <button className={`button toolbar-button ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && onPress()}>
            <div className='icon' style={{maskImage: `url(${icon})`}} />
        </button>
    );
}

export default ToolbarButton;