import React from 'react';
import qs from 'query-string';

import { GameStates } from '../constants';
import EnterGame from './EnterGame';
import Preparation from './Preparation/Preparation';
import Simulation from './Simulation/Simulation';
import Projector from './Projector';
import { useGame } from './GameProvider';

const queryParams = qs.parse(window.location.search);

const Game = () => {
  const { state: gameState } = useGame();

  if (!gameState) {
    return <EnterGame />;
  }

  if (queryParams.isProjectorView) {
    return <Projector />;
  }

  if (gameState === GameStates.PREPARATION) {
    return <Preparation />;
  }

  if (gameState === GameStates.SIMULATION) {
    return <Simulation />;
  }

  // TODO: ASSESSMENT phase
  if (gameState === GameStates.ASSESSMENT) {
    return <>ASSESSMENT</>;
  }

  return <>Unknown game state</>;
};

export default Game;
