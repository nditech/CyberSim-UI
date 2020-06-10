import React, { useState, useEffect } from 'react';
import qs from 'query-string';

import { GameStates, SocketEvents } from '../constants';
import EnterGame from './EnterGame';
import Preparation from './Preparation/Preparation';

const queryParams = qs.parse(window.location.search);

const Game = ({ socket }) => {
  const [game, setGame] = useState(null); // TODO: game should be a context or an easy state store

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
    return (
      <Preparation socket={socket} game={game} setGame={setGame} />
    );
  }

  // TODO: ASSESSMENT phase
  if (game.state === GameStates.ASSESSMENT) {
    return <>ASSESSMENT</>;
  }

  // TODO: SIMULATION phase
  if (game.state === GameStates.SIMULATION) {
    return <>SIMULATION</>;
  }

  return <>Unknown game state</>;
};

export default Game;
