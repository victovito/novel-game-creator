import React, { PropsWithChildren, useEffect, useState } from "react";

import NovelObject from "../../engine/structural/NovelObject";

import PausedContext from "./PausedContext";

function ReaderContextWrapper({ children }: PropsWithChildren) {
    const [paused, setPaused] = useState<boolean>(initPaused);

    useEffect(() => {
        paused != undefined && sessionStorage.setItem("reader-paused", JSON.stringify(paused));
    }, [paused]);

    return (
        <PausedContext.Provider value={{ paused, setPaused }}>
            {children}
        </PausedContext.Provider>
    );
}

export default ReaderContextWrapper;

function initPaused() {
    const paused = sessionStorage.getItem("reader-paused");
    return paused ? JSON.parse(paused) : undefined;
}
