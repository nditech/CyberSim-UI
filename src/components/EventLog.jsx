import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const EventLog = ({ className }) => {
  return (
    <Row className={className} id="logs">
      <Col xs={9}>
        <h3>EVENTS LOG:</h3>
      </Col>
      <Col xs={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
          type="button"
        >
          EXPAND ALL
        </Button>
      </Col>
      <Col>TODO: event logs</Col>
    </Row>
  );
};

export default EventLog;
