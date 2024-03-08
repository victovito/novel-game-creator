import React from 'react';

type props = {
    text: string;
    onPress?: () => void;
    disabled?: boolean;
}

function MenuButton({ text, onPress, disabled }: props) {
    return (
        <button className={`button menu-button ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && onPress()}>{text}</button>
    )
};

export default MenuButton;
