import React, { useEffect, useState } from 'react';
import NovelState from '../../engine/objects/NovelState';
import Text from '../../engine/expressions/Text';
import Value from '../../engine/values/Value';
import { useTypingContext } from '../../contexts/reader/TypingContext';

type props = {
    state: NovelState,
    text: Text,
    distance?: number
};

function TextRender({ text, state, distance = 0 }: props) {
    const {typing, setTyping} = useTypingContext();
    const [slice, setSlice] = useState(0);
    const [typeTimeout, setTypeTimeout] = useState<NodeJS.Timeout>(null);

    let content = text.content;

    text.variables.forEach(variable => {
        const value = state.novel.getVariable(variable.value);
        if (value && value instanceof Value) {
            content = content.replace(`{$${variable.value}}`, value.value);
        }
    });
    
    function nextNonSpaceIndex() {
        for (let i = slice + 1; i < content.length; i++) {
            if (content.charAt(i) != " ") {
                return i;
            }
        }
        return slice + 1;
    }

    function typeNextChar() {
        const timeout = setTimeout(() => {
            setSlice(nextNonSpaceIndex());
        }, 50);
        setTypeTimeout(timeout);
    }

    useEffect(() => {
        if (distance <= 0) {
            setSlice(content.length + 1);
        }
    }, []);

    useEffect(() => {
        if (distance <= 0 && slice < content.length && !typing) {
            clearTimeout(typeTimeout);
            setTypeTimeout(null);
            setSlice(content.length + 1);
        }
    }, [typing]);

    useEffect(() => {
        if (distance == 0) {
            if (slice == 0) {
                setSlice(1);
                setTyping(true);
            } else if (slice < content.length) {
                typeNextChar();
            }
            if (slice == content.length && distance == 0) {
                setTyping(false);
            }
        }
    }, [distance, slice])

    return (
        <div className="render-text">
            <span className="rendered">{content.slice(0, slice)}</span>
            <span className="unrendered">{content.slice(slice)}</span>
        </div>
    );
}

export default TextRender;