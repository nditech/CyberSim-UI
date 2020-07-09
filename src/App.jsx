import React from 'react';
import { view } from '@risingstack/react-easy-state';

import Game from './components/Game';
import ErrorBox from './components/ErrorBox';
import InfoBox from './components/InfoBox';
import { gameStore } from './components/GameStore';
import { StaticDataProvider } from './components/StaticDataProvider';

const App = view(() => {
  if (!gameStore.socketConnected) {
    return <div>Connecting Socket...</div>;
  }
  return (
    <StaticDataProvider>
      <ErrorBox />
      <InfoBox />
      <Game />
    </StaticDataProvider>
  );
});

export default App;
