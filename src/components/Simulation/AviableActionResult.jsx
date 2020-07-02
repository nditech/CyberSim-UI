import React, { useMemo } from 'react';
import { Col } from 'react-bootstrap';
import { numberToUsd } from '../../util';

const AviableActionResult = (props) => {
  const { action } = props;

  const actionResultDescription = useMemo(() => {
    const resultDescription = [];
    if (action.cost !== 0)
      resultDescription.push(`Cost: ${numberToUsd(action.cost)}`);
    if (action.poll_increase !== 0)
      resultDescription.push(
        `Gain ${action.poll_increase}% in polls`,
      );
    if (action.budget_increase !== 0)
      resultDescription.push(
        `Raise: ${numberToUsd(action.budget_increase)}`,
      );
    return `(${resultDescription.join(', ')})`;
  }, [action]);

  return (
    <Col
      xs={3}
      className="justify-content-end d-flex align-items-center"
    >
      {actionResultDescription}
    </Col>
  );
};

export default AviableActionResult;
