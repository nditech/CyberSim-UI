import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Badge,
} from 'react-bootstrap';
import { view, store } from '@risingstack/react-easy-state';
import { orderBy as _orderBy, reduce as _reduce } from 'lodash';

import { useStaticData } from '../StaticDataProvider';
import { gameStore } from '../GameStore';
import Log from './Log';
import EventLogSwitch from './EventLogSwitch';
import Mitigations from '../Mitigations/Mitigations';

export const accordionOpeners = store([]);

export const logTypes = {
  Preparations: 'Preparations',
  BudgetItem: 'Budget Item Purchase',
  SystemRestore: 'System Restore Action',
  CampaignAction: 'Campaign Action',
  ThreatInjected: 'Threat Injected',
  ThreatPrevented: 'Threat Prevented',
  GameState: 'Game State Changed',
  CurveballEvent: 'Curveball Event',
};

const EventLogs = view(({ className }) => {
  const { logs: gameLogs, injections: gameInjections } = gameStore;
  const { injections } = useStaticData();

  const logs = useMemo(() => {
    const preventedLogs = _reduce(
      gameInjections,
      (acc, { injection_id, prevented, prevented_at }) => {
        if (prevented) {
          acc.push({
            type: 'Threat Prevented',
            injection: injections[injection_id],
            game_timer: prevented_at,
            id: `injection_${injection_id}`,
          });
        }
        return acc;
      },
      [],
    );
    const injectionLogs = _reduce(
      gameInjections,
      (acc, gameInjection) => {
        if (gameInjection.delivered) {
          acc.push({
            type: 'Threat Injected',
            injection: injections[gameInjection.injection_id],
            gameInjection,
            game_timer: gameInjection.delivered_at,
            id: `injection_${gameInjection.injection_id}`,
          });
        }
        return acc;
      },
      [],
    );
    return _orderBy(
      [...preventedLogs, ...injectionLogs, ...gameLogs],
      'game_timer',
    );
  }, [gameInjections, injections, gameLogs]);

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
        <h2 className="font-weight-bold">EVENTS LOG:</h2>
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
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.Preparations}
          </ToggleButton>
          <ToggleButton
            value={logTypes.BudgetItem}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.BudgetItem}
          </ToggleButton>
          <ToggleButton
            value={logTypes.SystemRestore}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.SystemRestore}
          </ToggleButton>
          <ToggleButton
            value={logTypes.CampaignAction}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.CampaignAction}
          </ToggleButton>
          <ToggleButton
            value={logTypes.ThreatInjected}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.ThreatInjected}
          </ToggleButton>
          <ToggleButton
            value={logTypes.ThreatPrevented}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.ThreatPrevented}
          </ToggleButton>
          <ToggleButton
            value={logTypes.GameState}
            variant="outline-primary"
            className="p-1 d-flex align-items-center justify-content-center mr-1 rounded"
          >
            {logTypes.GameState}
          </ToggleButton>
          <ToggleButton
            value={logTypes.CurveballEvent}
            variant="outline-primary"
            className="p-1 rounded"
          >
            {logTypes.CurveballEvent}
          </ToggleButton>
        </ToggleButtonGroup>
      </Col>
      <Col xs={12}>
        {filter[logTypes.Preparations] && (
          <Log
            title={
              <div className="d-flex align-items-center">
                00:00 -
                <Badge pill variant="dark" className="py-1 mx-1">
                  {logTypes.Preparations}
                </Badge>
                Preparation Mitigations Selected
              </div>
            }
          >
            <Mitigations isLog className="card-body" />
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
