import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { BsClock } from 'react-icons/bs';

import { useGame } from './GameProvider';
import { msToMinutesSeconds, numberToUsd } from '../util';

const TimeTaken = () => {
  const {
    paused,
    millis_taken_before_started: millisTakenBeforeStarted,
    started_at: startedAt,
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
  );
};

// TODO: add param for what size it should use and reuse BPT at the pojector
// BudgetPollTimer
const BPT = () => {
  const { budget, poll } = useGame();

  return (
    <Row>
      <Col md={4} style={{ whiteSpace: 'nowrap' }}>
        <h4 className="font-weight-normal mb-0">
          {numberToUsd(budget).replace('$', '$ ')}
        </h4>
      </Col>
      <Col md={4}>
        <h4 className="font-weight-normal mb-0">% {poll}</h4>
      </Col>
      <Col md={4}>
        <TimeTaken />
      </Col>
    </Row>
  );
};

export default BPT;
