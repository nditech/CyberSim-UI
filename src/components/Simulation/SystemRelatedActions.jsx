import React, { useMemo, useCallback } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { filter as _filter } from 'lodash';

import { useStaticData } from '../StaticDataProvider';
import { gameStore } from '../GameStore';
import { numberToUsd } from '../../util';

const SystemRelatedActions = ({ location, className }) => {
  const {
    mitigations: gameMitigations,
    systems: gameSystems,
    popError,
    closeError,
  } = gameStore;
  const { responses, systems } = useStaticData();

  const systemRealtedActions = useMemo(
    () =>
      _filter(
        responses,
        ({
          systems_to_restore,
          required_mitigation,
          required_mitigation_type,
          location: responseLocation,
        }) =>
          // has system to restore
          systems_to_restore?.length &&
          // location type matches
          (!location || responseLocation === location) &&
          // restorable system is down
          systems_to_restore.some((key) => !gameSystems[key]) &&
          // required mitigation met
          (!required_mitigation_type ||
            (required_mitigation_type === 'party'
              ? gameMitigations[`${required_mitigation}_hq`] &&
                gameMitigations[`${required_mitigation}_local`]
              : gameMitigations[
                  `${required_mitigation}_${required_mitigation_type}`
                ])),
      ),
    [responses, gameMitigations, gameSystems, location],
  );

  const submitAction = useCallback(
    (event) => {
      event.persist();
      event.preventDefault();
      event.stopPropagation();
      const isValid = event.target.checkValidity();
      if (isValid) {
        closeError();
        console.log('emit system related action with socket io', {
          action: event.target.systemRealtedActions.value,
        });
      } else {
        popError('Please select an action.');
      }
    },
    [popError, closeError],
  );

  return (
    <Form onSubmit={submitAction} noValidate>
      <Row className={className}>
        <Col md={9}>
          <h3>ACTIONS RELATED TO TECHNICAL SYSTEMS:</h3>
        </Col>
        <Col md={3}>
          <Button
            variant="outline-primary"
            className="rounded-pill w-100"
            type="submit"
          >
            PERFORM ACTION
          </Button>
        </Col>
        <Col>
          {systemRealtedActions.map((action) => (
            <Form.Check
              custom
              required
              key={action.id}
              type="radio"
              className="mb-2"
              label={`${numberToUsd(action.cost)} ${
                action.description
              } (Restores:${action.systems_to_restore.map(
                (systemId) => ` ${systems[systemId].name}`,
              )})`}
              name="systemRealtedActions"
              id={action.id}
              value={action.id}
            />
          ))}
        </Col>
      </Row>
    </Form>
  );
};

export default SystemRelatedActions;
