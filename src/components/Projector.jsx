import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import { useGame } from './GameProvider';
import BPT from './BPT';
import Systems from './Systems';

const Projector = () => {
  const { id } = useGame();

  return (
    <>
      <div
        className="position-sticky bg-white"
        style={{ top: 0, zIndex: 1 }}
      >
        <Row className="m-0">
          <Col
            xs={12}
            className="simulation-menu-item--big active p-0 d-flex justify-content-center"
          >
            <h1 className="my-2">{id}</h1>
          </Col>
        </Row>
      </div>
      <Container>
        <div className="my-5 py-5">
          <BPT big />
        </div>
        <Systems />
      </Container>
    </>
  );
};

export default Projector;
