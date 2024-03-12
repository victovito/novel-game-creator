import React, { PropsWithChildren, useEffect, useState } from "react";

import Novel from "../../engine/objects/Novel";
import NovelState, { INovelStateData } from "../../engine/objects/NovelStateManager";

import NovelContext from "./NovelContext";
import StateContext from "./StateContext";
import PausedContext from "./PausedContext";

function ReaderContextWrapper({ children }: PropsWithChildren) {
    const [novel, setNovel] = useState<Novel>(initNovel);
    const [state, setState] = useState<NovelState>(initState);
    const [paused, setPaused] = useState<boolean>(initPaused);

    useEffect(() => {
        paused != undefined && sessionStorage.setItem("reader-paused", JSON.stringify(paused));
    }, [paused]);

    useEffect(() => {
        state != undefined && sessionStorage.setItem("reader-state-data", JSON.stringify(state.data));
    }, [state]);

    return (
        <NovelContext.Provider value={{ novel, setNovel }}>
            <StateContext.Provider value={{ state, setState }}>
                <PausedContext.Provider value={{ paused, setPaused }}>
                    {children}
                </PausedContext.Provider>
            </StateContext.Provider>
        </NovelContext.Provider>
    );
}

export default ReaderContextWrapper;

function initNovel(): Novel {
    return undefined;
}

function initState(): NovelState {
    const data = localStorage.getItem("reader-state-data");
    return new NovelState(null, data ? JSON.parse(data) as INovelStateData : null);
}

function initPaused(): boolean {
    const paused = sessionStorage.getItem("reader-paused");
    return paused ? JSON.parse(paused) : false;
}
