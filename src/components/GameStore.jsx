import qs from 'query-string';
import { store } from '@risingstack/react-easy-state';
import io from 'socket.io-client';

import { SocketEvents } from '../constants';

const socket = io(process.env.REACT_APP_API_URL);

let errorTimer = null;

export const gameStore = store({
  loading: false,

  // ERROR
  error: {
    message: '',
    show: false,
  },
  closeError: () => (gameStore.error.show = false),
  popError: (errorMessage) => {
    gameStore.error = { message: errorMessage, show: true };
    if (errorTimer) {
      clearTimeout(errorTimer);
    }
    errorTimer = setTimeout(() => {
      gameStore.closeError();
    }, 4000);
  },

  // HELPERS
  setGame: (game) => {
    Object.keys(game).forEach((key) => {
      if (key === 'systems') {
        gameStore.systems = game.systems.reduce(
          (acc, { system_id, state }) => ({
            ...acc,
            [system_id]: state,
          }),
          {},
        );
      } else if (key === 'mitigations') {
        gameStore.mitigations = game.mitigations.reduce(
          (acc, { mitigation_id, location, state }) => ({
            ...acc,
            [`${mitigation_id}_${location}`]: state,
          }),
          {},
        );
      } else {
        gameStore[key] = game[key];
      }
    });
  },
  emitEvent: (event, params) =>
    params
      ? socket.emit(
          event,
          params,
          ({ error }) => error && gameStore.popError(error),
        )
      : socket.emit(
          event,
          ({ error }) => error && gameStore.popError(error),
        ),

  // ACTIONS
  actions: {
    enterGame: ({ eventType, gameId, rememberGameId }) => {
      gameStore.loading = true;
      socket.emit(eventType, gameId, ({ error, game }) => {
        if (!error) {
          gameStore.setGame(game);
          if (rememberGameId) {
            localStorage.setItem('gameId', gameId);
          } else {
            localStorage.removeItem('gameId');
          }
        } else {
          gameStore.popError(error);
        }
        gameStore.loading = false;
      });
    },
    resumeSimulation: () =>
      gameStore.emitEvent(SocketEvents.STARTSIMULATION),
    pauseSimulation: () =>
      gameStore.emitEvent(SocketEvents.PAUSESIMULATION),
    finishSimulation: () =>
      gameStore.emitEvent(SocketEvents.FINISHSIMULATION),
    toggleMitigation: (params) =>
      gameStore.emitEvent(SocketEvents.CHANGEMITIGATION, params),
    performAction: (params) =>
      gameStore.emitEvent(SocketEvents.PERFORMACTION, params),
    restoreSystem: (params) =>
      gameStore.emitEvent(SocketEvents.RESTORESYSTEM, params),
    startSimulation: () =>
      gameStore.emitEvent(SocketEvents.STARTSIMULATION),
    deliverInjection: (params) =>
      gameStore.emitEvent(SocketEvents.DELIVEREINJECTION, params),
    respondToInjection: (params) =>
      gameStore.emitEvent(SocketEvents.RESPONDTOINJECTION, params),
    nonCorrectRespondToInjection: (params) =>
      gameStore.emitEvent(
        SocketEvents.NONCORRECTRESPONDTOINJECTION,
        params,
      ),
  },
});

socket.on(SocketEvents.CONNECT, () => {
  gameStore.socketConnected = true;
});

// LISTEN TO GAME STATE UPDATES
socket.on(SocketEvents.GAMEUPDATED, (g) => gameStore.setGame(g));

// RECONNECT GAME ROOM IF CONNECTION LOST
socket.on(SocketEvents.RECONNECT, () => {
  if (gameStore.id) {
    socket.emit(
      SocketEvents.JOINGAME,
      gameStore.id,
      ({ error, game: g }) => {
        if (!error) {
          gameStore.setGame(g);
        }
        gameStore.popError(error);
      },
    );
  }
});

// AUTO JOIN GAME FORM QUERY PARAMS
const { gameId: gameIdFromQuery, ...newParams } = qs.parse(
  window.location.search,
);
if (gameIdFromQuery) {
  gameStore.loading = true;
  socket.emit(
    SocketEvents.JOINGAME,
    gameIdFromQuery,
    ({ error, game }) => {
      if (!error) {
        gameStore.setGame(game);
        window.history.replaceState(
          null,
          null,
          `?${qs.stringify(newParams)}`,
        );
        localStorage.setItem('gameId', gameIdFromQuery);
      } else {
        gameStore.loading = false;
      }
    },
  );
}
