import React, { useState, useCallback, useEffect } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import qs from 'query-string';

import { SocketEvents } from '../constants';

const gameIdFromLocalStorage = localStorage.getItem('gameId');
const queryParams = qs.parse(window.location.search);

let errorTimeout;

const EnterGame = ({ setGame, socket }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(null);
  const [gameId, setGameId] = useState(gameIdFromLocalStorage || '');
  const [rememberGameId, setRememberGameId] = useState(
    !!gameIdFromLocalStorage,
  );

  // TODO: refactor this to upper level, so it can be used by other components
  const popError = useCallback(
    (errorMessage) => {
      setError(errorMessage);
      setShowError(true);
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
      errorTimeout = setTimeout(() => {
        setShowError(false);
      }, 4000);
    },
    [setError, setShowError],
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
          setLoading(false);
        }
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
            setGame(game);
          } else {
            setLoading(false);
          }
        },
      );
    }
  }, [setGame, socket, setLoading]);

  return (
    <Container fluid="md" className="mt-5 pt-5">
      <div
        className="position-fixed"
        style={{
          bottom: '20px',
          left: '50%',
          transform: 'translate(-50%)',
        }}
      >
        <Alert
          show={showError}
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          {error}
        </Alert>
      </div>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Row className="font-weight-bold">
            <Col>
              <h4>ENTER GAME</h4>
            </Col>
          </Row>
          <Form>
            <Form.Group controlId="GameId">
              <Form.Label>
                <h5 className="font-weight-normal mb-0">
                  Your game’s name:
                </h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Game Id"
                onChange={(event) => setGameId(event.target.value)}
                value={gameId}
                autoComplete="off"
                style={{ fontSize: '1.125rem' }}
              />
            </Form.Group>
            <Form.Group controlId="RememberGameId">
              <Form.Check
                type="switch"
                label="Remember me"
                defaultChecked={rememberGameId}
                onChange={(e) => setRememberGameId(e.target.checked)}
                style={{ fontSize: '1.125rem' }}
              />
            </Form.Group>
            <Row className="my-4">
              <Col>
                <Button
                  variant="outline-primary"
                  className="rounded-pill w-100"
                  type="button"
                  disabled={!gameId || loading}
                  onClick={() => enterGame(SocketEvents.CREATEGAME)}
                >
                  <h4 className="font-weight-normal mb-0">
                    Create Game
                  </h4>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-primary"
                  className="rounded-pill w-100"
                  type="button"
                  disabled={!gameId || loading}
                  onClick={() => enterGame(SocketEvents.JOINGAME)}
                >
                  <h4 className="font-weight-normal mb-0">
                    Join Game
                  </h4>
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EnterGame;
