import React, { useState } from 'react';

import NovelState from '../../engine/objects/NovelState';
import Choice from '../../engine/scopes/Choice';
import Option from '../../engine/expressions/Option';

import OptionRender from './OptionRender';

type props = {
    state: NovelState,
    show: boolean,
    choice: Choice
};

function ChoiceRender({ state, show, choice }: props) {
    const [selected, setSelected] = useState<Option>();

    function onSelect(option: Option) {
        setSelected(option)
    }

    function getOptions() {
        return choice.renderElements.map((option, i) => (
            <OptionRender state={state} option={option} key={i} onSelect={onSelect} selected={selected} />
        ));
    }

    const style: React.CSSProperties = {}
    if (!show) {
        style.opacity = "0%";
        style.pointerEvents = "none";
    }

    return (
        <div style={style} className={`render-choice ${selected ? "selected" : ""}`}>
            {getOptions()}
        </div>
    );
}

export default ChoiceRender;