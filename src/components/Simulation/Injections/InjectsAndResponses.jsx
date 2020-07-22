import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import { filter as _filter } from 'lodash';

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

  const injectionsToShow = useMemo(() => {
    const timeTaken = paused
      ? millisTakenBeforeStarted
      : Date.now() -
        new Date(startedAt).getTime() +
        millisTakenBeforeStarted;
    let shownFutureInjectionCounter = 0;
    let injectionToDeliverFound = false;
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
            (!gameInjections[id]?.response_made_at &&
              !preventedInjections.some(
                (preventedId) => id === preventedId,
              )));
        if (inFuture && canAppear) {
          shownFutureInjectionCounter += 1;
        }
        return canAppear;
      },
    ).map((injection) => {
      const gameInjection = gameInjections[injection.id];
      const delivered = gameInjection?.delivered;
      const canMakeResponse =
        !gameInjection?.response_made_at && delivered;
      const canDeliver =
        !delivered && !injectionToDeliverFound && gameInjection;
      if (canDeliver) {
        injectionToDeliverFound = true;
      }
      return {
        injection,
        upcoming: !gameInjection,
        canDeliver,
        canMakeResponse,
        delivered,
        prevented:
          !gameInjection &&
          (preventedInjections.some(
            (preventedId) => injection.id === preventedId,
          ) ||
            (injection.skipper_mitigation &&
              injection.skipper_mitigation_type &&
              gameMitigations[
                `${injection.skipper_mitigation}_${injection.skipper_mitigation_type}`
              ])),
        isDanger:
          !canDeliver &&
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
    gameInjections,
    preventedInjections,
    gameMitigations,
  ]);

  return (
    <Row className={className} id="injects">
      <Col xs={12}>
        <h3>INJECTS AND RESPONSES:</h3>
      </Col>
      <Col>
        {injectionsToShow.map(
          ({
            injection,
            upcoming,
            canDeliver,
            canMakeResponse,
            prevented,
            delivered,
            isDanger,
          }) => (
            <Injection
              injection={injection}
              key={injection.id}
              prevented={prevented}
              delivered={delivered}
              isDanger={isDanger}
              upcoming={upcoming}
              canDeliver={canDeliver}
              canMakeResponse={canMakeResponse}
            />
          ),
        )}
      </Col>
    </Row>
  );
});

export default InjectsAndResponses;
