import React, { useState, useCallback } from 'react';

import { GameStates } from '../constants';
import EnterGame from './EnterGame';

const gameIdFromLocalStorage = localStorage.getItem('gameId');

const Game = ({ socket, popError }) => {
  // TODO: get gameId from query params and join automatically
  // TODO: isProjectorView from quey params
  const [game, setGame] = useState(null);
  const [rememberGameId, setRememberGameId] = useState(
    !!gameIdFromLocalStorage,
  );
  const [gameId, setGameId] = useState(gameIdFromLocalStorage || '');

  const enterGame = useCallback(
    (eventType) => {
      socket.emit(eventType, gameId, ({ error, game }) => {
        if (!error) {
          setGame(game);
          if (rememberGameId) {
            localStorage.setItem('gameId', gameId);
          } else {
            localStorage.removeItem('gameId');
          }
        } else {
          popError(error);
        }
      });
    },
    [socket, setGame, gameId, popError, rememberGameId],
  );

  if (!game) {
    return (
      <EnterGame
        enterGame={enterGame}
        gameId={gameId}
        setGameId={setGameId}
        rememberGameId={rememberGameId}
        setRememberGameId={setRememberGameId}
      />
    );
  }

  if (game.state === GameStates.PREPARATION) {
    return <>Preparation</>;
  }

  if (game.state === GameStates.SCORE) {
    return <>Score</>;
  }

  if (game.state === GameStates.PROGRESS) {
    return <>Progress</>;
  }

  return <>Unknown game state</>;
};

export default Game;
