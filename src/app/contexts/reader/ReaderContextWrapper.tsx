import React, { PropsWithChildren, useEffect, useState } from "react";

import Novel from "../../engine/objects/Novel";
import NovelState, { INovelStateData } from "../../engine/objects/NovelState";
import NovelParsingError from "../../engine/errors/parsing/NovelParsingError";

import NovelContext from "./NovelContext";
import StateContext from "./StateContext";
import PausedContext from "./PausedContext";
import ParsingErrorContext from "./ParsingErrorContext";
import TypingContext from "./TypingContext";

function ReaderContextWrapper({ children }: PropsWithChildren) {
    const [novel, setNovel] = useState<Novel>(undefined);
    const [error, setError] = useState<NovelParsingError>(undefined);
    const [state, setState] = useState<NovelState>(initState);
    const [paused, setPaused] = useState<boolean>(initPaused);
    const [typing, setTyping] = useState<boolean>(false);

    useEffect(() => {
        paused != undefined && sessionStorage.setItem("reader-paused", JSON.stringify(paused));
    }, [paused]);

    useEffect(() => {
        state != undefined && state.data != undefined && sessionStorage.setItem("reader-state-data", JSON.stringify(state.data));
    }, [state]);

    useEffect(() => {}, [novel]);

    return (
        <NovelContext.Provider value={{ novel, setNovel }}>
            <ParsingErrorContext.Provider value={{ error, setError }}>
                <StateContext.Provider value={{ state, setState }}>
                    <PausedContext.Provider value={{ paused, setPaused }}>
                        <TypingContext.Provider value={{ typing, setTyping }}>
                            {children}
                        </TypingContext.Provider>
                    </PausedContext.Provider>
                </StateContext.Provider>
            </ParsingErrorContext.Provider>
        </NovelContext.Provider>
    );
}

export default ReaderContextWrapper;

function initState(): NovelState {
    const data = sessionStorage.getItem("reader-state-data");
    return new NovelState(null, data ? JSON.parse(data) as INovelStateData : null);
}

function initPaused(): boolean {
    const paused = sessionStorage.getItem("reader-paused");
    return paused ? JSON.parse(paused) : false;
}
