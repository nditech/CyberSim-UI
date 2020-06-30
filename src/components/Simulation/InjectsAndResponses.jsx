import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import { keyBy as _keyBy, filter as _filter } from 'lodash';

import Injection from './Injection';
import { gameStore } from '../GameStore';
import { useStaticData } from '../StaticDataProvider';

const InjectsAndResponses = view(({ className, location }) => {
  const {
    paused,
    millis_taken_before_started: millisTakenBeforeStarted,
    started_at: startedAt,
    injections: gameInjections,
    prevented_injections: preventedInjections,
    mitigations: gameMitigations,
  } = gameStore;
  const { injections } = useStaticData();

  const gameInjectionsByInjectionId = useMemo(
    () => _keyBy(gameInjections, 'injection_id'),
    [gameInjections],
  );

  const injectionsToShow = useMemo(() => {
    const timeTaken = paused
      ? millisTakenBeforeStarted
      : Date.now() -
        new Date(startedAt).getTime() +
        millisTakenBeforeStarted;
    return _filter(
      injections,
      ({
        location: injectionLocation,
        trigger_time: triggerTime,
        id,
      }) =>
        // Location (hq or local)
        (injectionLocation === location ||
          injectionLocation === null) &&
        // Max 10 minutes into the future
        timeTaken + 600000 >= triggerTime &&
        // Future or "Past and response not made yet" or "Past and not prevented"
        (timeTaken < triggerTime ||
          (timeTaken >= triggerTime &&
            !gameInjectionsByInjectionId[id]?.response_made &&
            !preventedInjections.some(
              (preventedId) => id === preventedId,
            ))),
    ).map((injection) => {
      const gameInjection = gameInjectionsByInjectionId[injection.id];
      const canMakeResponse =
        gameInjection && !gameInjection.response_made;
      return {
        injection,
        disabled: !canMakeResponse,
        delivered: !!(gameInjection && gameInjection.delivered),
        prevented:
          preventedInjections.some(
            (preventedId) => injection.id === preventedId,
          ) ||
          (injection.skipper_mitigation &&
            injection.skipper_mitigation_type &&
            gameMitigations[
              `${injection.skipper_mitigation}_${injection.skipper_mitigation_type}`
            ]),
      };
    });
  }, [
    paused,
    millisTakenBeforeStarted,
    startedAt,
    injections,
    location,
    gameInjectionsByInjectionId,
    preventedInjections,
    gameMitigations,
  ]);

  return (
    <Row className={className}>
      <Col md={12}>
        <h3>INJECTS AND RESPONSES:</h3>
      </Col>
      <Col>
        {injectionsToShow.map(
          ({ injection, disabled, prevented, delivered }) => (
            <Injection
              injection={injection}
              key={injection.id}
              disabled={disabled}
              prevented={prevented}
              delivered={delivered}
            />
          ),
        )}
      </Col>
    </Row>
  );
});

export default InjectsAndResponses;
