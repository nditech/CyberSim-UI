import React, { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import { filter as _filter } from 'lodash';

import Injection from './Injection';
import { gameStore } from '../../GameStore';
import { useStaticData } from '../../StaticDataProvider';
import useTimeTaken from '../../../hooks/useTimeTaken';

const InjectsAndResponses = view(({ className, location }) => {
  const { injections: gameInjections } = gameStore;
  const { injections } = useStaticData();
  const timeTaken = useTimeTaken();

  const { injectionsToResponse, resolvedInjections } = useMemo(() => {
    let injectionToDeliverFound = false;
    return _filter(
      injections,
      ({ location: injectionLocation }) =>
        injectionLocation === location || injectionLocation === null,
    ).reduce(
      (acc, injection) => {
        const gameInjection = gameInjections[injection.id];
        const {
          delivered,
          prevented,
          response_made_at: responseMadeAt,
        } = gameInjection;
        const upcoming = timeTaken < injection.trigger_time;
        const resolved =
          timeTaken > injection.trigger_time &&
          (responseMadeAt || prevented);
        const canMakeResponse = !responseMadeAt && delivered;
        const canDeliver =
          !upcoming &&
          !delivered &&
          !injectionToDeliverFound &&
          !prevented;
        if (canDeliver) {
          injectionToDeliverFound = true;
        }
        const injectionWithParams = {
          injection,
          upcoming: timeTaken < injection.trigger_time,
          resolved,
          canDeliver,
          canMakeResponse,
          delivered,
          gameInjection,
          prevented,
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
  }, [injections, location, gameInjections, timeTaken]);

  return (
    <>
      <Row className={className} id="injects">
        <Col xs={12}>
          <h2 className="font-weight-bold">EVENTS AND RESPONSES:</h2>
        </Col>
        <Col>
          {injectionsToResponse.length
            ? injectionsToResponse.map(
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
              )
            : 'No upcoming event.'}
        </Col>
      </Row>
      <Row className={className} id="resolved_injects">
        <Col xs={12}>
          <h2 className="font-weight-bold">RESOLVED EVENTS:</h2>
        </Col>
        <Col>
          {resolvedInjections.length
            ? resolvedInjections.map(
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
              )
            : 'No event resolved.'}
        </Col>
      </Row>
    </>
  );
});

export default InjectsAndResponses;
