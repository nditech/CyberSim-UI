import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import Systems from '../Systems';

const ActionTable = () => {
  return (
    <>
      <Row className="mt-5 pt-4">
        <Col xs={12}>
          <h3>TECHNICAL SYSTEMS:</h3>
        </Col>
      </Row>
      <Systems />

      <Row className="mt-5 pt-4">
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

      <Row className="mt-5 pt-4">
        <Col md={6}>
          <h3>MITIGATED THREATS:</h3>
          TODO: list mitigated threats (injections which will not
          cause trouble)
        </Col>
        <Col md={6}>
          <h3>NOT MITIGATED THREATS:</h3>
          TODO: list mitigated threats (injections which WILL cause
          trouble)
        </Col>
      </Row>

      <Row className="mt-5 pt-4">
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

      <Row className="my-5 py-4">
        <Col xs={12}>
          <h3>EVENTS LOG:</h3>
        </Col>
        <Col>TODO: event logs</Col>
      </Row>
    </>
  );
};

export default ActionTable;
