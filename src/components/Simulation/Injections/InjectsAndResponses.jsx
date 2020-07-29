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

  const { injectionsToResponse, resolvedInjections } = useMemo(() => {
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
      }) => {
        // injections return by the api in triggerTime order
        // only allow 5 future injections to appear
        if (shownFutureInjectionCounter === 5) {
          return false;
        }
        const canAppear =
          // Location match
          injectionLocation === location ||
          injectionLocation === null;
        if (timeTaken < triggerTime && canAppear) {
          shownFutureInjectionCounter += 1;
        }
        return canAppear;
      },
    ).reduce(
      (acc, injection) => {
        const gameInjection = gameInjections[injection.id];
        // not ("Future" or "Response not made yet and not prevented")
        const resolved = !(
          timeTaken < injection.trigger_time ||
          (!gameInjection?.response_made_at &&
            !preventedInjections.some(
              (preventedId) => injection.id === preventedId,
            ))
        );
        const delivered = gameInjection?.delivered;
        const canMakeResponse =
          !gameInjection?.response_made_at && delivered;
        const canDeliver =
          !resolved &&
          !delivered &&
          !injectionToDeliverFound &&
          gameInjection;
        if (canDeliver) {
          injectionToDeliverFound = true;
        }
        const injectionWithParams = {
          injection,
          upcoming: !resolved && !gameInjection,
          resolved,
          canDeliver,
          canMakeResponse,
          delivered,
          gameInjection,
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
        if (resolved) {
          acc.resolvedInjections.push(injectionWithParams);
        } else {
          acc.injectionsToResponse.push(injectionWithParams);
        }
        return acc;
      },
      { injectionsToResponse: [], resolvedInjections: [] },
    );
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
    <>
      <Row className={className} id="injects">
        <Col xs={12}>
          <h2 className="font-weight-bold">EVENTS AND RESPONSES:</h2>
        </Col>
        <Col>
          {injectionsToResponse.map(
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
      <Row className={className} id="resolved_injects">
        <Col xs={12}>
          <h2 className="font-weight-bold">RESOLVED EVENTS:</h2>
        </Col>
        <Col>
          {resolvedInjections.map(
            ({
              injection,
              upcoming,
              canDeliver,
              canMakeResponse,
              prevented,
              delivered,
              isDanger,
              resolved,
              gameInjection,
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
                resolved={resolved}
                gameInjection={gameInjection}
              />
            ),
          )}
        </Col>
      </Row>
    </>
  );
});

export default InjectsAndResponses;
