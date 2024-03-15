import React from 'react';
import NovelState from '../../engine/objects/NovelState';
import Text from '../../engine/expressions/Text';

type props = {
    state: NovelState,
    text: Text,
    show?: boolean
};

function TextRender({ text, state, show = true }: props) {
    let content = text.content;

    text.variables.forEach(variable => {
        const value = state.novel.getVariable(variable.value);
        if (value) {
            content = content.replace(`{$${variable.value}}`, value.value);
        }
    });

    const style: React.CSSProperties = {};
    if (!show) style.opacity = "0%";

    return (
        <span style={style}>{content}</span>
    );
}

export default TextRender;