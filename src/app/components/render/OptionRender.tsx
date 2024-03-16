import React from 'react';
import NovelState from '../../engine/objects/NovelState';
import Option from '../../engine/expressions/Option';
import Value from '../../engine/values/Value';

type props = {
    state: NovelState,
    option: Option
};

function OptionRender({ state, option }: props) {
    let content = option.text;

    option.variables.forEach(variable => {
        const value = state.novel.getVariable(variable.value);
        if (value && value instanceof Value) {
            content = content.replace(`{$${variable.value}}`, value.value);
        }
    });

    function onClick() {
        state.next();
        option.commands && option.commands.forEach(command => {
            state.novel.run(command);
        });
    }
    return (
        <button className='render-option button' onClick={onClick}>{content}</button>
    );
}

export default OptionRender;