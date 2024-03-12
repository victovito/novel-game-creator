import React, { PropsWithChildren, useEffect, useState } from "react";

import Novel from "../../engine/objects/Novel";
import { INovelState } from "../../engine/objects/NovelStateManager";

import NovelContext from "./NovelContext";
import StateContext from "./StateContext";
import PausedContext from "./PausedContext";

function ReaderContextWrapper({ children }: PropsWithChildren) {
    const [novel, setNovel] = useState<Novel>(initNovel);
    const [state, setState] = useState<INovelState>(initState);
    const [paused, setPaused] = useState<boolean>(initPaused);

    useEffect(() => {
        paused != undefined && sessionStorage.setItem("reader-paused", JSON.stringify(paused));
    }, [paused]);

    useEffect(() => {
        state != undefined && sessionStorage.setItem("reader-state", JSON.stringify(state));
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

function initState(): INovelState {
    const state = localStorage.getItem("reader-state");
    return state ? JSON.parse(state) : undefined;
}

function initPaused(): boolean {
    const paused = sessionStorage.getItem("reader-paused");
    return paused ? JSON.parse(paused) : false;
}
