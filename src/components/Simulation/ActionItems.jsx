import React, { useCallback, useMemo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {
  // filter as _filter,
  reduce as _reduce,
  map as _map,
} from 'lodash';
import { view } from '@risingstack/react-easy-state';

import AviableActionResult from './AviableActionResult';
import { gameStore } from '../GameStore';
import { useStaticData } from '../StaticDataProvider';
//import { numberToUsd } from '../../util';

const ActionItems = view(({ className, location }) => {
  const {
    budget,
    systems: gameSystems,
    actions: { toggleMitigation },
    popError,
    closeError,
  } = gameStore;
  const { actions, systems } = useStaticData();

  console.log(systems);
  const actionList = useMemo(() => {
    const actionsWithSystems = _map(actions, (action) => {
      action.unaviable_systems = action.required_systems.filter(
        (system) => gameSystems[system],
      );
      return action;
    });

    return _reduce(
      actionsWithSystems,
      (result, value, key) => {
        if (value.unaviable_systems.length === 0) {
          result.aviable.push(value);
        } else {
          result.notAviable.push(value);
        }
        return result;
      },
      {
        aviable: [],
        notAviable: [],
      },
    );
  }, [actions, gameSystems]);

  console.log(actionList);

  const submitAction = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isValid =
        event.target.checkValidity() &&
        event.target?.budgetItems?.value;
      if (isValid) {
        closeError();
        toggleMitigation({
          id: event.target.budgetItems.value,
          type: location,
          value: true,
        });
      } else {
        popError('Please select an action.');
      }
    },
    [popError, closeError, toggleMitigation, location],
  );

  return (
    <>
      <Form onSubmit={submitAction} noValidate>
        <Row className={className}>
          <Col xs={9}>
            <h3>{`AVIABLE NATIONAL ${location.toUpperCase()} ACTIONS: $0`}</h3>
          </Col>
          <Col xs={3}>
            <Button
              variant="outline-primary"
              className="rounded-pill w-100"
              type="submit"
              disabled={!actionList.aviable}
            >
              PERFORM ACTION
            </Button>
          </Col>
          <Col>
            {actionList.aviable.length
              ? actionList.aviable.map((action) => (
                  <Form.Check
                    custom
                    required
                    type="radio"
                    className="custom-radio-right"
                    key={action.id}
                    label={
                      <Row className="py-1 select-row align-items-center">
                        <Col xs={9}>{action.description}</Col>
                        <AviableActionResult action={action} />
                      </Row>
                    }
                    name="budgetItems"
                    disabled={budget < action.cost}
                    id={action.id}
                    value={action.id}
                  />
                ))
              : 'No budget item is available to purchase.'}
          </Col>
        </Row>
      </Form>

      <Row className={className}>
        <Col xs={9}>
          <h3>{`NOT AVIABLE NATIONAL ${location.toUpperCase()} ACTIONS: $0`}</h3>
        </Col>
        <Col xs={3}></Col>
        <Col>
          {actionList.notAviable.length
            ? actionList.notAviable.map((action) => (
                <Row className="py-1 select-row align-items-center">
                  <Col xs={8}>{action.description}</Col>
                  <Col xs={4}>
                    {action.unaviable_systems
                      .map((system) => systems[system].name)
                      .join(', ')}
                  </Col>
                </Row>
              ))
            : 'No budget item is available to purchase.'}
        </Col>
      </Row>
    </>
  );
});

export default ActionItems;
