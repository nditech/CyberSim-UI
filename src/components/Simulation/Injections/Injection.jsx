import React, { useMemo } from 'react';
import { Accordion, Card, Row, Col, Form } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import classNames from 'classnames';
import { AiOutlineDown } from 'react-icons/ai';

import InjectionBody from './InjectionBody';
import { gameStore } from '../../GameStore';
import { msToMinutesSeconds } from '../../../util';

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
            <InjectionBody
              injection={injection}
              prevented={prevented}
              canMakeResponse={canMakeResponse}
              bgColor={bgColor}
            />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  },
);

export default Injection;
