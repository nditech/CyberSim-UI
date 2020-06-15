import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { BsClock } from 'react-icons/bs';
import { FiPause, FiPlay } from 'react-icons/fi';

import { useGame } from '../GameProvider';
import { numberToUsd, msToMinutesSeconds } from '../../util';

const Footer = () => {
  const {
    id,
    budget,
    poll,
    paused,
    millis_taken_before_started: millisTakenBeforeStarted,
    started_at: startedAt,
    actions: { resumeSimulation, pauseSimulation, finishSimulation },
  } = useGame();

  // INIT TIMER
  const [timeTaken, setTimeTaken] = useState(
    msToMinutesSeconds(
      paused
        ? millisTakenBeforeStarted
        : Date.now() -
            new Date(startedAt).getTime() +
            millisTakenBeforeStarted,
    ),
  );
  const timeRef = useRef();

  // UPDATE TIMER
  useEffect(() => {
    if (paused) {
      setTimeTaken(msToMinutesSeconds(millisTakenBeforeStarted));
    } else if (!timeRef.current) {
      timeRef.current = setInterval(
        () =>
          setTimeTaken(
            msToMinutesSeconds(
              Date.now() -
                new Date(startedAt).getTime() +
                millisTakenBeforeStarted,
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
  }, [
    setTimeTaken,
    timeRef,
    paused,
    millisTakenBeforeStarted,
    startedAt,
  ]);

  return (
    <div
      className="py-4 border-primary border-top position-fixed w-100 bg-white"
      style={{ bottom: 0 }}
    >
      <Container fluid="md">
        <Row className="d-flex align-items-center">
          <Col md={2} style={{ whiteSpace: 'nowrap' }}>
            <h4 className="font-weight-normal mb-0">
              {numberToUsd(budget).replace('$', '$ ')}
            </h4>
          </Col>
          <Col md={2}>
            <h4 className="font-weight-normal mb-0">% {poll}</h4>
          </Col>
          <Col md={2}>
            <h4
              className={classNames(
                'font-weight-normal mb-0 d-flex align-items-center',
                {
                  'text-danger': paused,
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
                padding: paused ? '6px 4px 6px 8px' : '6px',
              }}
              onClick={paused ? resumeSimulation : pauseSimulation}
            >
              {paused ? <FiPlay /> : <FiPause />}
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
              <h4 className="font-weight-normal mb-0">{id}</h4>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
