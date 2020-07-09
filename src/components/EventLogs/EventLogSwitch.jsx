import React, { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import BudgetItemLog from './BudgetItemLog';
import CampaignActionLog from './CampaignActionLog';
import Log from './Log';
import { msToMinutesSeconds } from '../../util';

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
        <BudgetItemLog
          game_timer={game_timer}
          type={type}
          mitigation_type={mitigation_type}
          mitigation_id={mitigation_id}
        />
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
        <CampaignActionLog
          game_timer={game_timer}
          type={type}
          action_id={action_id}
        />
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
