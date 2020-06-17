import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

// TODO: type prop: filter for hq or local
const SystemRelatedActions = ({ type, className }) => {
  return (
    <Row className={className}>
      <Col md={9}>
        <h3>ACTIONS RELATED TO TECHNICAL SYSTEMS:</h3>
      </Col>
      <Col md={3}>
        <Button
          variant="outline-primary"
          className="rounded-pill w-100"
          type="button"
        >
          PERFORM ACTION
        </Button>
      </Col>
      <Col>TODO: actions radio buttons</Col>
    </Row>
  );
};

export default SystemRelatedActions;
