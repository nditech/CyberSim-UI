import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { view, store } from '@risingstack/react-easy-state';
import { map as _map, orderBy as _orderBy } from 'lodash';

import { useStaticData } from '../StaticDataProvider';
import { gameStore } from '../GameStore';
import Log from './Log';
import EventLogSwitch from './EventLogSwitch';
import Preparation from '../Preparation/Preparation';

export const accordionOpeners = store([]);

export const logTypes = {
  Preparations: 'Preparations',
  BudgetItem: 'Budget Item Purchase',
  SystemRestore: 'System Restore Action',
  CampaignAction: 'Campaign Action',
  ThreatInjected: 'Threat Injected',
  ThreatPrevented: 'Threat Prevented',
  GameState: 'Game State Changed',
};

const EventLogs = view(({ className }) => {
  const {
    logs: gameLogs,
    injections: gameInjections,
    prevented_injections: preventedInjections,
  } = gameStore;
  const { injections } = useStaticData();

  const logs = useMemo(() => {
    const preventedLogs = preventedInjections.map((injectionId) => ({
      type: 'Threat Prevented',
      injection: injections[injectionId],
      game_timer: injections[injectionId].trigger_time,
      id: `injection_${injectionId}`,
    }));
    const injectionLogs = _map(gameInjections, (gameInjection) => ({
      type: 'Threat Injected',
      injection: injections[gameInjection.injection_id],
      gameInjection,
      game_timer: gameInjection.delivered_at,
      id: `injection_${gameInjection.injection_id}`,
    })).filter(({ gameInjection }) => gameInjection.delivered);
    return _orderBy(
      [...preventedLogs, ...injectionLogs, ...gameLogs],
      'game_timer',
    );
  }, [gameInjections, preventedInjections, injections, gameLogs]);

  const [filterValue, setFilterValue] = useState(
    Object.values(logTypes),
  );
  const filter = useMemo(
    () =>
      filterValue.reduce(
        (acc, logType) => ({ ...acc, [logType]: true }),
        {},
      ),
    [filterValue],
  );

  return (
    <Row className={className} id="logs">
      <Col xs={4} className="pr-1">
        <h3>EVENTS LOG:</h3>
      </Col>
      <Col xs={2} className="px-1">
        <Button
          variant="outline-primary"
          className="rounded-pill w-100 d-flex justify-content-center"
          type="button"
          style={{ whiteSpace: 'nowrap' }}
          onClick={() => setFilterValue(Object.values(logTypes))}
        >
          SHOW ALL
        </Button>
      </Col>
      <Col xs={2} className="px-1">
        <Button
          variant="outline-primary"
          className="rounded-pill w-100 d-flex justify-content-center"
          type="button"
          onClick={() => setFilterValue([])}
        >
          HIDE ALL
        </Button>
      </Col>
      <Col xs={2} className="px-1">
        <Button
          variant="outline-primary"
          className="rounded-pill w-100 d-flex justify-content-center"
          style={{ whiteSpace: 'nowrap' }}
          type="button"
          onClick={() =>
            accordionOpeners.forEach((openAccordion) =>
              openAccordion(false),
            )
          }
        >
          CLOSE ALL
        </Button>
      </Col>
      <Col xs={2} className="pl-1">
        <Button
          variant="outline-primary"
          className="rounded-pill w-100 d-flex justify-content-center"
          style={{ whiteSpace: 'nowrap' }}
          type="button"
          onClick={() =>
            accordionOpeners.forEach((openAccordion) =>
              openAccordion(true),
            )
          }
        >
          EXPAND ALL
        </Button>
      </Col>
      <Col xs={12}>
        <ToggleButtonGroup
          type="checkbox"
          value={filterValue}
          onChange={setFilterValue}
          className="d-flex log-filter"
          style={{ zIndex: 0 }}
        >
          <ToggleButton
            value={logTypes.Preparations}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.Preparations}
          </ToggleButton>
          <ToggleButton
            value={logTypes.BudgetItem}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.BudgetItem}
          </ToggleButton>
          <ToggleButton
            value={logTypes.SystemRestore}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.SystemRestore}
          </ToggleButton>
          <ToggleButton
            value={logTypes.CampaignAction}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.CampaignAction}
          </ToggleButton>
          <ToggleButton
            value={logTypes.ThreatInjected}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.ThreatInjected}
          </ToggleButton>
          <ToggleButton
            value={logTypes.ThreatPrevented}
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.ThreatPrevented}
          </ToggleButton>
          <ToggleButton
            value={logTypes.GameState}
            variant="outline-primary"
            className="rounded"
          >
            {logTypes.GameState}
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      <Col xs={12}>
        {filter[logTypes.Preparations] && (
          <Log title="00:00 - Preparation Mitigations Selected">
            <Preparation log className="card-body" />
          </Log>
        )}
        {logs.map((log) => (
          <EventLogSwitch log={log} key={log.id} filter={filter} />
        ))}
      </Col>
    </Row>
  );
});

export default EventLogs;
