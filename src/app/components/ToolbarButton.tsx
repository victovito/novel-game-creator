import React from 'react';

type props = {
    icon: string;
    onPress?: () => void;
    disabled?: boolean;
}

function ToolbarButton({ icon, onPress, disabled}: props) {
    function onClick(event: React.MouseEvent) {
        event.stopPropagation();
        !disabled && onPress && onPress();
    }
    return (
        <button className={`button toolbar-button ${disabled ? 'disabled' : ''}`} onClick={onClick}>
            <div className='icon' style={{maskImage: `url(${icon})`}} />
        </button>
    );
}

export default ToolbarButton;