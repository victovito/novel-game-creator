import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNovelContext } from '../../contexts/reader/NovelContext';
import { useParsingErrorContext } from '../../contexts/reader/ParsingErrorContext';

import IconButton from '../../components/IconButton';
import MenuButton from '../../components/MenuButton';

import closeIcon from "../../assets/icons/close.svg";
import { useStateContext } from '../../contexts/reader/StateContext';
import { useNovelFileContext } from '../../contexts/NovelFileContext';

function ReaderEntry() {
    const {novel} = useNovelContext();
    const {error} = useParsingErrorContext();
    const {setState} = useStateContext();
    const {novelFile} = useNovelFileContext();
    const navigate = useNavigate();

    function start() {
        setState(undefined);
        navigate("novel");
    }

    function continueNovel() {
        setState(undefined);
        navigate("novel");
    }

    function update() {
        api.checkForNovelUpdate(novelFile.path, novelFile.content);
    }

    function goToMenu() {
        navigate("/");
    }

    return (
        <div className="reader-entry">
            {novel ? (
                <div className='render-entry-content'>
                    <div className="info">
                        <h1 className='title'>{novel.title}</h1>
                        <h4 className='author'>{novel.author}</h4>
                    </div>
                    <div className="menu">
                        <MenuButton text='Start novel' onPress={start} />
                        <MenuButton text='Continue' onPress={continueNovel} />
                        <MenuButton text='Update' onPress={update} />
                        <MenuButton text='Exit to menu' onPress={goToMenu} />
                    </div>
                </div>
            ) : (
                <div className='reader-entry-error'>
                    <div className="close-button">
                        <IconButton icon={closeIcon} onPress={goToMenu} />
                    </div>
                    <div className="content">
                        <div className='message'>{error.message}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReaderEntry;