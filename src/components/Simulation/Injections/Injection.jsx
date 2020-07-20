import React, { useMemo } from 'react';
import { Accordion, Card, Row, Col, Form } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import classNames from 'classnames';
import { AiOutlineDown } from 'react-icons/ai';

import InjectionResponseForm from './InjectionResponseForm';
import { gameStore } from '../../GameStore';
import { msToMinutesSeconds } from '../../../util';
import { useStaticData } from '../../StaticDataProvider';

const Injection = view(
  ({
    injection,
    prevented,
    delivered,
    isDanger,
    upcoming,
    canDeliver,
    canMakeResponse,
  }) => {
    const { systems } = useStaticData();

    const {
      actions: { deliverInjection },
    } = gameStore;

    const bgColor = useMemo(() => {
      if (prevented) {
        return 'bg-success-light';
      }
      if (isDanger) {
        return 'bg-danger-light';
      }
      if (upcoming) {
        return 'bg-warning-light';
      }
      return 'bg-white';
    }, [upcoming, isDanger, prevented]);

    return (
      <Accordion className="my-4">
        <Card
          className="border-primary injection"
          style={{ borderRadius: '1rem' }}
        >
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            className={classNames(
              'cursor-pointer border-primary py-3 injection-header',
              bgColor,
            )}
          >
            <Row className="align-items-center">
              <Col
                lg={8}
                xs={7}
                className="font-weight-bold"
              >{`${msToMinutesSeconds(injection.trigger_time)} - ${
                upcoming
                  ? `UPCOMING${prevented ? ' AVOIDED' : ''}: `
                  : ''
              }${injection.title}`}</Col>
              <Col
                lg={4}
                xs={5}
                className="d-flex justify-content-end align-items-center"
              >
                {(canDeliver || delivered) && (
                  <Form.Check
                    type="switch"
                    className={classNames(
                      'custom-switch-right rounded-pill px-2 py-1',
                      { 'select-row': canDeliver },
                    )}
                    style={{ width: 'fit-content' }}
                    id={injection.id}
                    label={
                      <span>
                        Delivered to table (trigger effects):
                      </span>
                    }
                    checked={delivered}
                    disabled={delivered}
                    onChange={(e) =>
                      e.target.checked &&
                      deliverInjection({
                        injectionId: injection.id,
                      })
                    }
                  />
                )}
                <AiOutlineDown
                  className="ml-2 text-primary"
                  fontSize="25px"
                />
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div>
              <Card.Body
                className={classNames(
                  'border-bottom border-top border-primary injection-body',
                  bgColor,
                )}
              >
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
                      Deliver asset to table:{' '}
                    </span>
                    {injection.asset_code}
                  </Col>
                </Row>
              </Card.Body>
              <Card.Body className={bgColor}>
                <InjectionResponseForm
                  injection={injection}
                  disabled={!canMakeResponse}
                />
              </Card.Body>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  },
);

export default Injection;
