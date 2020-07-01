import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { numberToUsd } from '../../util';

const MitigationCategory = ({
  name,
  mitigations,
  gameMitigations,
  toggleMitigation,
  allocatedBudget,
  budget,
}) => (
  <div className="my-5 py-3">
    <Row className="pb-2">
      <Col xs={9}>
        <h4 className="m-0 font-weight-normal border-bottom border-primary w-100 text-uppercase">
          ALLOCATED <span className="font-weight-bold">{name}</span>{' '}
          BUDGET : {numberToUsd(allocatedBudget)}
        </h4>
      </Col>
      <Col xs={3}>
        <Row>
          <Col xs={6} className="text-right">
            HQ
          </Col>
          <Col xs={6} className="text-right">
            Branch
          </Col>
        </Row>
      </Col>
    </Row>
    {mitigations.map((mitigation) => (
      <Row className="py-2 select-row" key={mitigation.id}>
        <Col xs={9}>{mitigation.description}</Col>
        <Col xs={3}>
          <Row>
            <Col xs={6} className="justify-content-end d-flex">
              {mitigation.is_hq && (
                <Form.Check
                  type="switch"
                  className="custom-switch-right"
                  id={`${mitigation.id}_hq`}
                  label={
                    <span>{numberToUsd(mitigation.hq_cost)}</span>
                  }
                  disabled={budget < mitigation.hq_cost}
                  checked={!!gameMitigations[`${mitigation.id}_hq`]}
                  onChange={(e) =>
                    toggleMitigation({
                      id: mitigation.id,
                      type: 'hq',
                      value: e.target.checked,
                    })
                  }
                />
              )}
            </Col>
            <Col xs={6} className="justify-content-end d-flex">
              {mitigation.is_local && (
                <Form.Check
                  type="switch"
                  className="custom-switch-right"
                  id={`${mitigation.id}_local`}
                  label={
                    <span>{numberToUsd(mitigation.local_cost)}</span>
                  }
                  disabled={budget < mitigation.local_cost}
                  checked={
                    !!gameMitigations[`${mitigation.id}_local`]
                  }
                  onChange={(e) =>
                    toggleMitigation({
                      id: mitigation.id,
                      type: 'local',
                      value: e.target.checked,
                    })
                  }
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    ))}
  </div>
);

export default MitigationCategory;
