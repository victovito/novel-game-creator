import React from 'react';
import NovelStateManager from '../../engine/objects/NovelStateManager';
import Text from '../../engine/expressions/Text';

type props = {
    stateManager: NovelStateManager,
    text: Text,
    show?: boolean
};

function TextRender({ text, stateManager, show = true }: props) {
    let content = text.content;

    text.variables.forEach(variable => {
        const value = stateManager.novel.getVariable(variable.value);
        content = content.replace(`{$${variable.value}}`, value?.value || "<NOT FOUND>");
    });

    const style: React.CSSProperties = {}
    if (!show) style.opacity = "0%";

    return (
        <span style={style}>{content}</span>
    );
}

export default TextRender;