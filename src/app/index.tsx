import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import NovelGame from './NovelGame';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<HashRouter><NovelGame/></HashRouter>);
