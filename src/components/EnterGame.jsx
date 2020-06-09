import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { SocketEvents } from '../constants';

const EnterGame = ({
  enterGame,
  setGameId,
  setRememberGameId,
  rememberGameId,
  gameId,
}) => (
  <Container fluid="md" className="mt-5 pt-5">
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
              // type="checkbox"
              type="switch"
              label="Remember me:"
              defaultChecked={rememberGameId}
              onChange={setRememberGameId}
              style={{ fontSize: '1.125rem' }}
            />
          </Form.Group>
          <Row className="my-4">
            <Col>
              <Button
                variant="outline-primary"
                className="rounded-pill w-100"
                type="button"
                disabled={!gameId}
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
                disabled={!gameId}
                onClick={() => enterGame(SocketEvents.JOINGAME)}
              >
                <h4 className="font-weight-normal mb-0">Join Game</h4>
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default EnterGame;
