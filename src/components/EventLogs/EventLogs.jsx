import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
// import { filter as _filter } from 'lodash';

// import { useStaticData } from '../StaticDataProvider';
import { gameStore } from '../GameStore';
import Log from './Log';
import Preparation from '../Preparation/Preparation';
import { msToMinutesSeconds } from '../../util';

const EventLogs = view(({ className }) => {
  const {
    logs: gameLogs,
    // injections: gameInjections,
    // prevented_injections: preventedInjections,
  } = gameStore;
  // TODO: show injections
  // const { injections } = useStaticData();
  // const injectionsToShow = useMemo(
  //   () =>
  //     _filter(
  //       injections,
  //       (injection) =>
  //         gameInjections[injection.id] ||
  //         preventedInjections.some(
  //           (preventedId) => preventedId === injection.id,
  //         ),
  //     ),
  //   [gameInjections, preventedInjections, injections],
  // );

  return (
    <Row className={className} id="logs">
      <Col xs={9}>
        <h3>EVENTS LOG:</h3>
      </Col>
      <Col xs={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
          type="button"
        >
          EXPAND ALL
        </Button>
      </Col>
      <Col xs={12}>
        <Log title="00:00 - Preparation Mitigations Selected">
          <Preparation log />
        </Log>
        {gameLogs.map(
          ({
            game_timer,
            descripition,
            type,
            mitigation_type,
            mitigation_id,
            response_id,
            action_id,
          }) => {
            // TODO: show data instead of ids
            switch (type) {
              case 'Budget Item Purchase':
                return (
                  <Log
                    title={`${msToMinutesSeconds(
                      game_timer,
                    )} - ${type}`}
                  >
                    <span>
                      {mitigation_id} {mitigation_type}
                    </span>
                  </Log>
                );
              case 'System Restore Action':
                return (
                  <Log
                    title={`${msToMinutesSeconds(
                      game_timer,
                    )} - ${type}`}
                  >
                    <span>{response_id}</span>
                  </Log>
                );
              case 'Campaign Action':
                return (
                  <Log
                    title={`${msToMinutesSeconds(
                      game_timer,
                    )} - ${type}`}
                  >
                    <span>{action_id}</span>
                  </Log>
                );
              case 'Game State Changed':
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
          },
        )}
      </Col>
    </Row>
  );
});

export default EventLogs;
