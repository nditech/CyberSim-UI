import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import { keyBy as _keyBy, filter as _filter } from 'lodash';

import Injection from './Injection';
import { gameStore } from '../../GameStore';
import { useStaticData } from '../../StaticDataProvider';

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
    let shownFutureInjectionCounter = 0;
    return _filter(
      injections,
      ({
        location: injectionLocation,
        trigger_time: triggerTime,
        id,
      }) => {
        // injections return by the api in triggerTime order
        // only allow 5 future injections to appear
        if (shownFutureInjectionCounter === 5) {
          return false;
        }
        const inFuture = timeTaken < triggerTime;
        const canAppear =
          // Location match
          (injectionLocation === location ||
            injectionLocation === null) &&
          // "Future" or "Response not made yet and not prevented"
          (inFuture ||
            (!gameInjectionsByInjectionId[id]?.response_made &&
              !preventedInjections.some(
                (preventedId) => id === preventedId,
              )));
        if (inFuture && canAppear) {
          shownFutureInjectionCounter += 1;
        }
        return canAppear;
      },
    ).map((injection) => {
      const gameInjection = gameInjectionsByInjectionId[injection.id];
      const canMakeResponse =
        gameInjection && !gameInjection.response_made;
      return {
        injection,
        disabled: !canMakeResponse,
        delivered: !!(gameInjection && gameInjection.delivered),
        prevented:
          !canMakeResponse &&
          (preventedInjections.some(
            (preventedId) => injection.id === preventedId,
          ) ||
            (injection.skipper_mitigation &&
              injection.skipper_mitigation_type &&
              gameMitigations[
                `${injection.skipper_mitigation}_${injection.skipper_mitigation_type}`
              ])),
        isDanger:
          !canMakeResponse &&
          injection.trigger_time - timeTaken < 180000,
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
      <Col xs={12}>
        <h3>INJECTS AND RESPONSES:</h3>
      </Col>
      <Col>
        {injectionsToShow.map(
          ({
            injection,
            disabled,
            prevented,
            delivered,
            isDanger,
          }) => (
            <Injection
              injection={injection}
              key={injection.id}
              disabled={disabled}
              prevented={prevented}
              delivered={delivered}
              isDanger={isDanger}
            />
          ),
        )}
      </Col>
    </Row>
  );
});

export default InjectsAndResponses;