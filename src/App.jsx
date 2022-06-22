import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Game from './components/Game';
import ErrorBox from './components/ErrorBox';
import InfoBox from './components/InfoBox';
import Migrate from './components/Migrate';
import { StaticDataProvider } from './components/StaticDataProvider';

const App = view(() => (
  <BrowserRouter>
    <StaticDataProvider>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="migrate" element={<Migrate />} />
      </Routes>
      <ErrorBox />
      <InfoBox />
    </StaticDataProvider>
  </BrowserRouter>
));

export default App;
