import React, { useEffect, useState, useCallback } from 'react';
import qs from 'query-string';

import { GameStates, SocketEvents } from '../constants';
import EnterGame from './EnterGame';
import Preparation from './Preparation';

const gameIdFromLocalStorage = localStorage.getItem('gameId');
const queryParams = qs.parse(window.location.search);

const Game = ({ socket, popError, setLoading, loading }) => {
  const [game, setGame] = useState(null);
  const [gameId, setGameId] = useState(gameIdFromLocalStorage || '');
  const [rememberGameId, setRememberGameId] = useState(
    !!gameIdFromLocalStorage,
  );
  const enterGame = useCallback(
    (eventType) => {
      setLoading(true);
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
        setLoading(false);
      });
    },
    [socket, setGame, gameId, popError, rememberGameId, setLoading],
  );

  useEffect(() => {
    if (queryParams.gameId) {
      setLoading(true);
      socket.emit(
        SocketEvents.JOINGAME,
        queryParams.gameId,
        ({ error, game }) => {
          if (!error) {
            setGameId(queryParams.gameId);
            setGame(game);
          }
          setLoading(false);
        },
      );
    }
  }, [setGame, socket, setLoading]);

  // TODO: add useEffect to change game state on gameUpdated socket events

  if (!game) {
    return (
      <EnterGame
        enterGame={enterGame}
        gameId={gameId}
        setGameId={setGameId}
        rememberGameId={rememberGameId}
        setRememberGameId={setRememberGameId}
        loading={loading}
      />
    );
  }

  if (queryParams.isProjectorView) {
    return <>PROJECTOR</>;
  }

  if (game.state === GameStates.PREPARATION) {
    return (
      <Preparation socket={socket} game={game} setGame={setGame} />
    );
  }

  if (game.state === GameStates.ASSESSMENT) {
    return <>ASSESSMENT</>;
  }

  if (game.state === GameStates.SIMULATION) {
    return <>SIMULATION</>;
  }

  return <>Unknown game state</>;
};

export default Game;
