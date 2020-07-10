import React, { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { logTypes } from './EventLogs';
import BudgetItemLog from './BudgetItemLog';
import CampaignActionLog from './CampaignActionLog';
import SystemRestoreLog from './SystemRestoreLog';
import Log from './Log';
import { msToMinutesSeconds } from '../../util';

// TODO: injection log details
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
  filter,
}) => {
  const shouldDisplay = useMemo(() => filter[type] || false, [
    filter,
    type,
  ]);

  const eventLog = useMemo(() => {
    switch (type) {
      case logTypes.BudgetItem:
        return (
          <BudgetItemLog
            game_timer={game_timer}
            type={type}
            mitigation_type={mitigation_type}
            mitigation_id={mitigation_id}
          />
        );
      case logTypes.SystemRestore:
        return (
          <SystemRestoreLog
            game_timer={game_timer}
            type={type}
            response_id={response_id}
          />
        );
      case logTypes.CampaignAction:
        return (
          <CampaignActionLog
            game_timer={game_timer}
            type={type}
            action_id={action_id}
          />
        );
      case logTypes.ThreatInjected:
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
      case logTypes.ThreatPrevented:
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
      case logTypes.GameState:
        return (
          <Log
            title={`${msToMinutesSeconds(
              game_timer,
            )} - ${descripition}`}
          />
        );
      default:
        return null;
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

  return shouldDisplay && eventLog;
};

export default EventLogSwitch;
