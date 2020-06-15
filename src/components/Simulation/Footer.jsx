import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { BsClock } from 'react-icons/bs';
import { FiPause, FiPlay } from 'react-icons/fi';

import { SocketEvents } from '../../constants';
import { numberToUsd, msToMinutesSeconds } from '../../util';

const Preparation = ({ socket, game }) => {
  const [timeTaken, setTimeTaken] = useState(
    msToMinutesSeconds(
      game.paused
        ? game.millis_taken_before_started
        : Date.now() -
            new Date(game.started_at).getTime() +
            game.millis_taken_before_started,
    ),
  );
  const timeRef = useRef();

  useEffect(() => {
    if (game.paused) {
      setTimeTaken(
        msToMinutesSeconds(game.millis_taken_before_started),
      );
    } else if (!timeRef.current) {
      timeRef.current = setInterval(
        () =>
          setTimeTaken(
            msToMinutesSeconds(
              Date.now() -
                new Date(game.started_at).getTime() +
                game.millis_taken_before_started,
            ),
          ),
        1000,
      );
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = undefined;
      }
    };
  }, [setTimeTaken, timeRef, game]);

  const resumeSimulation = useCallback(() => {
    socket.emit(
      SocketEvents.STARTSIMULATION,
      ({ error }) => error && console.error(error),
    );
  }, [socket]);

  const pauseSimulation = useCallback(() => {
    socket.emit(
      SocketEvents.PAUSESIMULATION,
      ({ error }) => error && console.error(error),
    );
  }, [socket]);

  const finishSimulation = useCallback(() => {
    socket.emit(
      SocketEvents.FINISHSIMULATION,
      ({ error }) => error && console.error(error),
    );
  }, [socket]);

  return (
    <div
      className="py-4 border-primary border-top position-fixed w-100 bg-white"
      style={{ bottom: 0 }}
    >
      <Container fluid="md">
        <Row className="d-flex align-items-center">
          <Col md={2} style={{ whiteSpace: 'nowrap' }}>
            <h4 className="font-weight-normal mb-0">
              {numberToUsd(game.budget).replace('$', '$ ')}
            </h4>
          </Col>
          <Col md={2}>
            <h4 className="font-weight-normal mb-0">% {game.poll}</h4>
          </Col>
          <Col md={2}>
            <h4
              className={classNames(
                'font-weight-normal mb-0 d-flex align-items-center',
                {
                  'text-danger': game.paused,
                },
              )}
            >
              <BsClock className="mr-2" />
              {timeTaken}
            </h4>
          </Col>
          <Col md={1} className="p-0">
            <Button
              variant="primary"
              className="rounded-circle d-flex justify-content-center align-items-center shadow-none"
              type="button"
              style={{
                fontSize: '25px',
                padding: game.paused ? '6px 4px 6px 8px' : '6px',
              }}
              onClick={
                game.paused ? resumeSimulation : pauseSimulation
              }
            >
              {game.paused ? <FiPlay /> : <FiPause />}
            </Button>
          </Col>
          <Col
            md={5}
            className="pl-0 pr-md-0 d-flex justify-content-end"
          >
            <Button
              variant="outline-primary"
              className="rounded-pill ml-1 ml-lg-3"
              type="button"
              onClick={finishSimulation}
              // TODO: add confirmation
            >
              <h4
                className="font-weight-normal mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                FINISH
                <span className="d-none d-lg-inline">
                  {' '}
                  SIMULATION
                </span>
              </h4>
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill ml-1 ml-lg-3"
              style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}
              type="button"
              onClick={() => console.log('TODO: open projector?')}
            >
              <h4 className="font-weight-normal mb-0">{game.id}</h4>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Preparation;
