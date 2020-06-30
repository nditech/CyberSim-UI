import React from 'react';
import { Accordion, Card, Row, Col, Form } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import classNames from 'classnames';

import { gameStore } from '../GameStore';
import { msToMinutesSeconds } from '../../util';
import { useStaticData } from '../StaticDataProvider';

const Injection = view(
  ({ injection, prevented, delivered, disabled }) => {
    const { systems } = useStaticData();

    const {
      actions: { deliverInjection },
    } = gameStore;

    // const submitAction = useCallback(
    //   (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     const isValid =
    //       event.target.checkValidity() &&
    //       event.target?.budgetItems?.value;
    //     if (isValid) {
    //       closeError();
    //       respondToInjection({
    //         responseIds: 'TODO:',
    //         injectionId: 'TODO:',
    //       });
    //     } else {
    //       popError('Please select an action.');
    //     }
    //   },
    //   [popError, closeError, respondToInjection],
    // );

    return (
      <Accordion className="my-4">
        <Card
          className={classNames('border-primary shadow-sm', {
            'bg-light': disabled,
          })}
          style={{ borderRadius: '1rem' }}
        >
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className={classNames(
              'cursor-pointer border-primary py-3',
              disabled ? 'bg-light' : 'bg-white',
            )}
          >
            <Row className="align-items-center">
              <Col
                lg={8}
                xs={7}
                className="font-weight-bold"
              >{`${msToMinutesSeconds(injection.trigger_time)} - ${
                disabled
                  ? `UPCOMING${prevented ? ' AVOIDED' : ''}: `
                  : ''
              }${injection.title}`}</Col>
              <Col
                lg={4}
                xs={5}
                className="d-flex justify-content-end"
              >
                <Form.Check
                  type="switch"
                  className={classNames(
                    'custom-switch-right rounded-pill px-2 py-1',
                    { 'select-row': !disabled },
                  )}
                  style={{ width: 'fit-content' }}
                  id={injection.id}
                  label={<span>Check if delivered to table:</span>}
                  checked={delivered}
                  disabled={disabled}
                  onChange={(e) =>
                    deliverInjection({
                      injectionId: injection.id,
                      delivered: e.target.checked,
                    })
                  }
                />
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div>
              <Card.Body className="border-bottom border-primary">
                <Row>
                  <Col xs={12} className="my-2">
                    <span className="font-weight-bold">
                      Description:{' '}
                    </span>
                    {injection.description}
                  </Col>
                  <Col xs={12} className="my-2">
                    <Row>
                      <Col xs={6} md={4}>
                        <span className="font-weight-bold">
                          Recipient:{' '}
                        </span>
                        {injection.recipient_role || '-'}
                      </Col>
                      <Col xs={6} md={4}>
                        <span className="font-weight-bold">
                          Systems disabled:{' '}
                        </span>
                        {injection.systems_to_disable?.length
                          ? injection.systems_to_disable.map(
                              (id) => systems[id].name,
                            )
                          : '-'}
                      </Col>
                      <Col xs={6} md={2}>
                        <span className="font-weight-bold">
                          Polls:{' '}
                        </span>
                        {injection.poll_change
                          ? `${injection.poll_change}%`
                          : '-'}
                      </Col>
                      <Col xs={6} md={2}>
                        <span className="font-weight-bold">
                          Avoided:{' '}
                        </span>
                        {prevented ? 'YES' : 'NO'}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} className="my-2">
                    <span className="font-weight-bold">
                      Deliver to table:{' '}
                    </span>
                    {injection.asset_code}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body>
                <Row>
                  <Col xs={12} className="my-2">
                    <span className="font-weight-bold">
                      Select correct responses implemented:{' '}
                    </span>
                    TODO:
                  </Col>
                  <Col xs={12} className="my-2">
                    <span className="font-weight-bold">
                      Effect of implemented responses:{' '}
                    </span>
                    TODO:
                  </Col>
                </Row>
              </Card.Body>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  },
);

export default Injection;
