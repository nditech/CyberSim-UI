import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { BsClock } from 'react-icons/bs';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from './GameStore';
import { msToMinutesSeconds, numberToUsd } from '../util';

const TimeTaken = view(({ big }) => {
  const {
    paused,
    millis_taken_before_started: millisTakenBeforeStarted,
    started_at: startedAt,
  } = gameStore;

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
        'bpt-item font-weight-normal mb-0 d-flex align-items-center',
        {
          'text-danger': paused,
        },
      )}
    >
      <BsClock className={big ? 'mr-3 pr-1' : 'mr-2'} />
      {timeTaken}
    </h4>
  );
});

// BudgetPollTimer
const BPT = view(({ big }) => {
  const { budget, poll } = gameStore;

  return (
    <Row
      className={classNames({
        'bpt-big': big,
      })}
    >
      <Col
        xs={6}
        md={4}
        style={{ whiteSpace: 'nowrap' }}
        className="px-2"
      >
        <h4 className="bpt-item font-weight-normal mb-0">
          {numberToUsd(budget).replace('$', '$ ')}
        </h4>
      </Col>
      <Col
        xs={6}
        md={4}
        className={classNames('px-2 d-flex', {
          'justify-content-center': !big,
        })}
      >
        <h4 className="bpt-item font-weight-normal mb-0">% {poll}</h4>
      </Col>
      <Col
        xs={6}
        md={4}
        className={classNames('px-2 d-flex', {
          'justify-content-end': !big,
        })}
      >
        <TimeTaken big={big} />
      </Col>
    </Row>
  );
});

export default BPT;
