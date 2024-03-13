import React from 'react';
import NovelState from '../../engine/objects/NovelState';
import Choice from '../../engine/scopes/Choice';
import OptionRender from './OptionRender';

type props = {
    state: NovelState,
    show: boolean,
    choice: Choice
};

function ChoiceRender({ state, show, choice }: props) {

    function getOptions() {
        return choice.renderElements.map((option, i) => (
            <OptionRender state={state} option={option} key={i} />
        ));
    }

    const style: React.CSSProperties = {}
    if (!show) {
        style.opacity = "0%";
        style.pointerEvents = "none";
    }

    return (
        <div style={style} className='render-choice'>
            {getOptions()}
        </div>
    );
}

export default ChoiceRender;