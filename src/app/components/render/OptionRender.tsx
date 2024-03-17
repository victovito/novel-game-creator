import React from 'react';

import NovelState from '../../engine/objects/NovelState';
import Option from '../../engine/expressions/Option';
import Value from '../../engine/values/Value';

type props = {
    state: NovelState,
    option: Option,
    onSelect: (option: Option) => void,
    selected?: Option
};

function OptionRender({ state, option, onSelect, selected }: props) {
    let content = option.text;

    option.variables.forEach(variable => {
        const value = state.novel.getVariable(variable.value);
        if (value && value instanceof Value) {
            content = content.replace(`{$${variable.value}}`, value.value);
        }
    });

    function onClick() {
        if (selected) return;
        onSelect(option);
        state.next();
        option.commands && option.commands.forEach(command => {
            state.novel.run(command);
        });
    }

    const style: React.CSSProperties = {};
    if (selected && selected !== option) style.opacity = "25%";

    return (
        <button className='render-option button' style={style} onClick={onClick}>{content}</button>
    )
}

export default OptionRender;