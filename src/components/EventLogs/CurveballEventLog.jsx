import React, { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Log from './Log';
import { useStaticData } from '../StaticDataProvider';
import { msToMinutesSeconds, numberToUsd } from '../../util';

const CurveballEventLog = ({ game_timer, type, curveball_id }) => {
  const { curveballs } = useStaticData();
  const curveball = useMemo(() => curveballs[curveball_id], [
    curveballs,
    curveball_id,
  ]);

  return (
    <Log
      title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
        curveball.description
      }`}
    >
      <Card.Body>
        <Row>
          <Col>{curveball.description}</Col>
          {!!curveball.poll_decrease && (
            <Col xs={2} className="text-right">
              <span className="font-weight-bold">Poll: </span>-
              {curveball.poll_decrease}%
            </Col>
          )}
          {!!curveball.budget_decrease && (
            <Col xs={2} className="text-right">
              <span className="font-weight-bold">Budget: </span>-
              {numberToUsd(curveball.budget_decrease)}
            </Col>
          )}
        </Row>
      </Card.Body>
    </Log>
  );
};

export default CurveballEventLog;
