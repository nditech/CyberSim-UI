import React from 'react';
import { Row, Col, FormCheck } from 'react-bootstrap';

import { numberToUsd } from '../../util';

const MitigationCategory = ({
  name,
  mitigations,
  game,
  toggleMitigation,
}) => {
  // TODO: change game state and emit socket event on switch
  // calculate allocated budgets, use switch state from game state
  return (
    <div className="my-5 py-3">
      <Row className="pb-2">
        <Col md={9}>
          <h4 className="m-0 font-weight-normal border-bottom border-primary w-100 text-uppercase">
            ALLOCATED <span className="font-weight-bold">{name}</span>{' '}
            BUDGET : $0
          </h4>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={6} className="text-right">
              HQ
            </Col>
            <Col md={6} className="text-right">
              Branch
            </Col>
          </Row>
        </Col>
      </Row>
      {mitigations.map((mitigation) => (
        <Row className="py-2 mitigation-row" key={mitigation.id}>
          <Col md={9}>{mitigation.description}</Col>
          <Col md={3}>
            <Row>
              <Col md={6} className="justify-content-end d-flex">
                {mitigation.is_hq && (
                  <FormCheck
                    type="switch"
                    className="custom-switch-right"
                    id={`${mitigation.id}_hq`}
                    label={numberToUsd(mitigation.hq_cost)}
                  />
                )}
              </Col>
              <Col md={6} className="justify-content-end d-flex">
                {mitigation.is_local && (
                  <FormCheck
                    type="switch"
                    className="custom-switch-right"
                    id={`${mitigation.id}_local`}
                    label={numberToUsd(mitigation.local_cost)}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default MitigationCategory;
