import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { view } from '@risingstack/react-easy-state';
import classNames from 'classnames';

import InjectionResponseForm from './InjectionResponseForm';
import { useStaticData } from '../../StaticDataProvider';

const InjectionBody = view(
  ({
    injection,
    prevented,
    canMakeResponse,
    bgColor = '',
    gameInjection,
  }) => {
    const { systems } = useStaticData();

    return (
      <div>
        <Card.Body
          className={classNames(
            'border-top border-primary injection-body border-bottom',
            bgColor,
          )}
        >
          <Row>
            <Col xs={12} className="my-2">
              <span className="font-weight-bold">Description: </span>
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
                <Col
                  xs={6}
                  md={4}
                  className={classNames({
                    'text-disabled': prevented,
                  })}
                >
                  <span className="font-weight-bold">
                    Systems disabled:{' '}
                  </span>
                  {injection.systems_to_disable?.length
                    ? injection.systems_to_disable.map(
                        (id) => systems[id].name,
                      )
                    : '-'}
                </Col>
                <Col
                  xs={6}
                  md={2}
                  className={classNames({
                    'text-disabled': prevented,
                  })}
                >
                  <span className="font-weight-bold">Polls: </span>
                  {injection.poll_change
                    ? `${injection.poll_change}%`
                    : '-'}
                </Col>
                <Col xs={6} md={2}>
                  <span className="font-weight-bold">Avoided: </span>
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
        {!prevented && (
          <Card.Body
            className={classNames(
              'border-primary injection-body border-bottom',
              bgColor,
            )}
          >
            <InjectionResponseForm
              injection={injection}
              gameInjection={gameInjection}
              disabled={!canMakeResponse}
            />
          </Card.Body>
        )}
        <Card.Body className={classNames('injection-body', bgColor)}>
          <Row>
            <Col xs={12}>
              <span className="font-weight-bold">
                Security Recommendations:{' '}
              </span>
              {injection.recommendations || 'Not specified'}
            </Col>
          </Row>
        </Card.Body>
      </div>
    );
  },
);

export default InjectionBody;
