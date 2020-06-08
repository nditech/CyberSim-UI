import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { SocketEvents } from '../constants';

const EnterGame = ({
  enterGame,
  setGameId,
  setRememberGameId,
  rememberGameId,
  gameId,
}) => (
  <Form>
    <Form.Group controlId="GameId">
      <Form.Label>Game Id</Form.Label>
      <Form.Control
        type="text"
        placeholder="Game Id"
        onChange={(event) => setGameId(event.target.value)}
        value={gameId}
      />
    </Form.Group>
    <Form.Group controlId="RememberGameId">
      <Form.Check
        type="checkbox"
        label="Remember me"
        defaultChecked={rememberGameId}
        onChange={setRememberGameId}
      />
    </Form.Group>
    <Button
      variant="primary"
      type="button"
      disabled={!gameId}
      onClick={() => enterGame(SocketEvents.CREATEGAME)}
    >
      Create Game
    </Button>
    <Button
      variant="secondary"
      type="button"
      disabled={!gameId}
      onClick={() => enterGame(SocketEvents.JOINGAME)}
    >
      Join Game
    </Button>
  </Form>
);

export default EnterGame;
