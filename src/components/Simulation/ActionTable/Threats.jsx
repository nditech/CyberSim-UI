import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Threats = ({ className }) => {
  return (
    <Row className={className} id="threats">
      <Col md={6}>
        <h3>MITIGATED THREATS:</h3>
        TODO: list mitigated threats (injections which will not cause
        trouble)
      </Col>
      <Col md={6}>
        <h3>NOT MITIGATED THREATS:</h3>
        TODO: list not mitigated threats (injections which WILL cause
        trouble)
      </Col>
    </Row>
  );
};

export default Threats;
