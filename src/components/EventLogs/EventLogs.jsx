import React, { useMemo } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { view, store } from '@risingstack/react-easy-state';
import { map as _map, orderBy as _orderBy } from 'lodash';

import { useStaticData } from '../StaticDataProvider';
import { gameStore } from '../GameStore';
import Log from './Log';
import EventLogSwitch from './EventLogSwitch';
import Preparation from '../Preparation/Preparation';

export const accordionOpeners = store([]);

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
      gameInjection: gameInjection,
      game_timer: injections[gameInjection.injection_id].trigger_time,
      id: `injection_${gameInjection.injection_id}`,
    }));
    return _orderBy(
      [...preventedLogs, ...injectionLogs, ...gameLogs],
      'game_timer',
    );
  }, [gameInjections, preventedInjections, injections, gameLogs]);

  return (
    <Row className={className} id="logs">
      <Col xs={6}>
        <h3>EVENTS LOG:</h3>
      </Col>
      <Col xs={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
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
      <Col xs={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
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
        <Log title="00:00 - Preparation Mitigations Selected">
          <Preparation log className="card-body" />
        </Log>
        {logs.map((log) => (
          <EventLogSwitch log={log} key={log.id} />
        ))}
      </Col>
    </Row>
  );
});

export default EventLogs;
