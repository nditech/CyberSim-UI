import React, { useState, useEffect } from 'react';
import qs from 'query-string';

import { GameStates, SocketEvents } from '../constants';
import EnterGame from './EnterGame';
import Preparation from './Preparation/Preparation';
import Simulation from './Simulation/Simulation';

const queryParams = qs.parse(window.location.search);

const Game = ({ socket }) => {
  const [game, setGame] = useState(null); // TODO: game should be a context or an easy state store

  useEffect(() => {
    const reconnectFunction = () => {
      if (game) {
        socket.emit(
          SocketEvents.JOINGAME,
          game.id,
          ({ error, game: g }) => {
            if (!error) {
              setGame(g);
            }
            // TODO: show reconnection error
          },
        );
      }
    };
    socket.on(SocketEvents.RECONNECT, reconnectFunction);
    return () => {
      socket.off(SocketEvents.RECONNECT, reconnectFunction);
    };
  }, [socket, setGame, game]);

  useEffect(() => {
    socket.on(SocketEvents.GAMEUPDATED, (g) => setGame(g));
  }, [socket, setGame]);

  if (!game) {
    return <EnterGame socket={socket} setGame={setGame} />;
  }

  // TODO: open projector button => use query params for game id and projector view
  if (queryParams.isProjectorView) {
    return <>PROJECTOR</>;
  }

  if (game.state === GameStates.PREPARATION) {
    return <Preparation socket={socket} game={game} />;
  }

  if (game.state === GameStates.SIMULATION) {
    return <Simulation socket={socket} game={game} />;
  }

  // TODO: ASSESSMENT phase
  if (game.state === GameStates.ASSESSMENT) {
    return <>ASSESSMENT</>;
  }

  return <>Unknown game state</>;
};

export default Game;
