import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const TriggerEvent = ({ className }) => {
  return (
    <Row className={className}>
      <Col md={9}>
        <h3>TRIGGER RANDOM EVENT</h3>
      </Col>
      <Col md={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
          type="button"
        >
          TRIGGER EVENT
        </Button>
      </Col>
      <Col>
        TODO: Select an available Event from the Dropdown Menu:
      </Col>
    </Row>
  );
};

export default TriggerEvent;
