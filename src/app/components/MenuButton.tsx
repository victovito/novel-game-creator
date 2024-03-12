import React from 'react';

type props = {
    text: string;
    onPress?: () => void;
    disabled?: boolean;
}

function MenuButton({ text, onPress, disabled }: props) {
    function onClick(event: React.MouseEvent) {
        event.stopPropagation();
        !disabled && onPress && onPress();
    }
    return (
        <button className={`button menu-button ${disabled ? 'disabled' : ''}`} onClick={onClick}>{text}</button>
    )
};

export default MenuButton;
