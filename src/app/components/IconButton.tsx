import React from 'react';

type props = {
    icon: string;
    onPress?: () => void;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
}

function IconButton({ icon, onPress, disabled, size = "md"}: props) {
    function onClick(event: React.MouseEvent) {
        event.stopPropagation();
        !disabled && onPress && onPress();
    }
    return (
        <button className={`button icon-button ${disabled ? 'disabled' : ''} ${size}`} onClick={onClick}>
            <div className='icon' style={{maskImage: `url(${icon})`}} />
        </button>
    );
}

export default IconButton;