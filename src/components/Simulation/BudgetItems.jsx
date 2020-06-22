import React, { useCallback, useMemo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { filter as _filter } from 'lodash';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from '../GameStore';
import { useStaticData } from '../StaticDataProvider';
import { numberToUsd } from '../../util';

const BudgetItems = view(({ className, location }) => {
  const {
    budget,
    mitigations: gameMitigations,
    actions: { toggleMitigation },
    popError,
    closeError,
  } = gameStore;
  const { mitigations } = useStaticData();

  const availableMitigations = useMemo(
    () =>
      _filter(
        mitigations,
        (mitigation) =>
          mitigation[`is_${location}`] &&
          !gameMitigations[`${mitigation.id}_${location}`],
      ),
    [mitigations, location, gameMitigations],
  );

  const submitAction = useCallback(
    (event) => {
      event.persist();
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
    <Form onSubmit={submitAction} noValidate>
      <Row className={className}>
        <Col md={9}>
          <h3>PURCHASE AVAILABLE BUDGET ITEM:</h3>
        </Col>
        <Col md={3}>
          <Button
            variant="outline-primary"
            className="rounded-pill w-100"
            type="submit"
            disabled={!availableMitigations.length}
          >
            PURCHASE ITEM
          </Button>
        </Col>
        <Col>
          {availableMitigations.length
            ? availableMitigations.map((mitigation) => (
                <Form.Check
                  custom
                  required
                  type="radio"
                  className="custom-radio-right"
                  key={mitigation.id}
                  label={
                    <Row className="py-1 select-row align-items-center">
                      <Col md={10}>{mitigation.description}</Col>
                      <Col
                        md={2}
                        className="justify-content-end d-flex align-items-center"
                      >
                        {numberToUsd(mitigation[`${location}_cost`])}
                      </Col>
                    </Row>
                  }
                  name="budgetItems"
                  disabled={budget < mitigation[`${location}_cost`]}
                  id={mitigation.id}
                  value={mitigation.id}
                />
              ))
            : 'No budget item is available to purchase.'}
        </Col>
      </Row>
    </Form>
  );
});

export default BudgetItems;
