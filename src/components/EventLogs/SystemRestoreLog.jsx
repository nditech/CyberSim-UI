import React, { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Log from './Log';
import { useStaticData } from '../StaticDataProvider';
import { msToMinutesSeconds, numberToUsd } from '../../util';

const SystemRestoreLog = ({ game_timer, type, response_id }) => {
  const { responses, systems } = useStaticData();
  const response = useMemo(() => responses[response_id], [
    responses,
    response_id,
  ]);

  return (
    <Log
      title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
        response.description
      }`}
    >
      <Card.Body>
        <Row>
          <Col xs={6}>{response.description}</Col>
          <Col xs={4}>
            <span className="font-weight-bold">Restores: </span>
            <span className="text-uppercase">
              {response.systems_to_restore.map(
                (systemId) => ` ${systems[systemId].name}`,
              )}
            </span>
          </Col>
          <Col xs={2} className="text-right">
            <span className="font-weight-bold">Cost: </span>
            {numberToUsd(response.cost)}
          </Col>
        </Row>
      </Card.Body>
    </Log>
  );
};

export default SystemRestoreLog;
