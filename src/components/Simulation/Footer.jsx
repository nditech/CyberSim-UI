import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiPause, FiPlay } from 'react-icons/fi';

import { useGame } from '../GameProvider';
import BPT from '../BPT';

const Footer = () => {
  const {
    id,
    paused,
    actions: { resumeSimulation, pauseSimulation, finishSimulation },
  } = useGame();

  return (
    <div
      className="py-4 border-primary border-top position-fixed w-100 bg-white"
      style={{ bottom: 0 }}
    >
      <Container fluid="md">
        <Row className="d-flex align-items-center">
          <Col md={6}>
            <BPT />
          </Col>
          <Col md={1} className="p-0">
            <Button
              variant="primary"
              className="rounded-circle d-flex justify-content-center align-items-center shadow-none"
              type="button"
              style={{
                fontSize: '25px',
                padding: paused ? '6px 4px 6px 8px' : '6px',
              }}
              onClick={paused ? resumeSimulation : pauseSimulation}
            >
              {paused ? <FiPlay /> : <FiPause />}
            </Button>
          </Col>
          <Col
            md={5}
            className="pl-0 pr-md-0 d-flex justify-content-end"
          >
            <Button
              variant="outline-primary"
              className="rounded-pill ml-1 ml-lg-3"
              type="button"
              onClick={finishSimulation}
              // TODO: add confirmation
            >
              <h4
                className="font-weight-normal mb-0"
                style={{ whiteSpace: 'nowrap' }}
              >
                FINISH
                <span className="d-none d-lg-inline">
                  {' '}
                  SIMULATION
                </span>
              </h4>
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill ml-1 ml-lg-3"
              style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}
              type="button"
              onClick={() => console.log('TODO: open projector?')}
            >
              <h4 className="font-weight-normal mb-0">{id}</h4>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;