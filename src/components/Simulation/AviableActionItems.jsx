import React, { useCallback, useMemo } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import { gameStore } from '../GameStore';
import { reduce as _reduce } from 'lodash';
import { numberToUsd } from '../../util';

const AviableActionItems = view(({ location, actionList }) => {
  const {
    budget,
    actions: { toggleMitigation },
    popError,
    closeError,
  } = gameStore;

  //TODO: action should be handled on server side
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

  const actionResultDescriptions = useMemo(
    () =>
      _reduce(
        actionList,
        (result, value, key) => {
          const resultDescription = [];
          if (value.cost !== 0)
            resultDescription.push(
              `Cost: ${numberToUsd(value.cost)}`,
            );
          if (value.poll_increase !== 0)
            resultDescription.push(
              `Gain ${value.poll_increase}% in polls`,
            );
          if (value.budget_increase !== 0)
            resultDescription.push(
              `Raise: ${numberToUsd(value.budget_increase)}`,
            );
          console.log(value, result, resultDescription);
          result[key] = resultDescription.join(', ');
          return result;
        },
        {},
      ),
    [actionList],
  );

  return (
    <Container className="p-0 m-0 pl-3">
      <Form onSubmit={submitAction} noValidate className="mb-4">
        <Row className="d-flex align-items-center mb-3">
          <Col xs={9}>
            <h5 className="m-0 font-weight-bold">AVIABLE ACTIONS:</h5>
          </Col>
          <Col xs={3}>
            <Button
              variant="outline-primary"
              className="rounded-pill w-100"
              type="submit"
              disabled={actionList.length === 0}
            >
              PERFORM ACTION
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {actionList.length
              ? actionList.map((action) => (
                  <Form.Check
                    custom
                    required
                    type="radio"
                    className="custom-radio-right"
                    key={action.id}
                    label={
                      <Row className="py-1 select-row align-items-center">
                        <Col xs={9}>{action.description}</Col>
                        <Col className="flex-grow-1">
                          {actionResultDescriptions[action.id]}
                        </Col>
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
    </Container>
  );
});

export default AviableActionItems;
