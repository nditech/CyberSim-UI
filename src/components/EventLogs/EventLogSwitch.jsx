import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Log from './Log';
import { msToMinutesSeconds } from '../../util';
import { useMemo } from 'react';

// TODO: event log details
const EventLogSwitch = ({
  log: {
    game_timer,
    descripition,
    type,
    mitigation_type,
    mitigation_id,
    response_id,
    action_id,
    injection,
  },
}) => {
  const eventLog = useMemo(() => {
    if (type === 'Budget Item Purchase') {
      return (
        <Log title={`${msToMinutesSeconds(game_timer)} - ${type}`}>
          <Card.Body>
            <Row>
              <Col>
                {mitigation_id} {mitigation_type}
              </Col>
            </Row>
          </Card.Body>
        </Log>
      );
    }
    if (type === 'System Restore Action') {
      return (
        <Log title={`${msToMinutesSeconds(game_timer)} - ${type}`}>
          <Card.Body>
            <Row>
              <Col>{response_id}</Col>
            </Row>
          </Card.Body>
        </Log>
      );
    }
    if (type === 'Campaign Action') {
      return (
        <Log title={`${msToMinutesSeconds(game_timer)} - ${type}`}>
          <Card.Body>
            <Row>
              <Col>{action_id}</Col>
            </Row>
          </Card.Body>
        </Log>
      );
    }
    if (type === 'Threat Injected') {
      return (
        <Log
          title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
            injection.title
          }`}
        >
          <Card.Body>
            <Row>
              <Col>{injection.id}</Col>
            </Row>
          </Card.Body>
        </Log>
      );
    }
    if (type === 'Threat Prevented') {
      return (
        <Log
          title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
            injection.title
          }`}
        >
          <Card.Body>
            <Row>
              <Col>{injection.id}</Col>
            </Row>
          </Card.Body>
        </Log>
      );
    }
    if (type === 'Game State Changed') {
      return (
        <Log
          title={`${msToMinutesSeconds(
            game_timer,
          )} - ${descripition}`}
        />
      );
    }
  }, [
    action_id,
    descripition,
    game_timer,
    injection,
    mitigation_id,
    mitigation_type,
    response_id,
    type,
  ]);

  return eventLog;
};

export default EventLogSwitch;
