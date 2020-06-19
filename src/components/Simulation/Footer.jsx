import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { FiPlay, FiBarChart2 } from 'react-icons/fi';
import { AiOutlinePause } from 'react-icons/ai';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from '../GameStore';
import BPT from '../BPT';

const Footer = view(() => {
  const {
    id,
    paused,
    actions: { resumeSimulation, pauseSimulation, finishSimulation },
  } = gameStore;

  return (
    <div
      className="border-primary border-top position-fixed w-100 bg-white shadow-lg"
      style={{
        bottom: 0,
        paddingBottom: '0.75rem',
        paddingTop: '0.75rem',
      }}
    >
      <Container fluid="md">
        <Row className="d-flex align-items-center">
          <Col xs={4} md={6}>
            <BPT />
          </Col>
          <Col xs={1} className="p-0">
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
              {paused ? <FiPlay /> : <AiOutlinePause />}
            </Button>
          </Col>
          <Col
            xs={7}
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
            <Nav.Link
              href={`?gameId=${id}&isProjectorView=true`}
              className="btn btn-outline-primary rounded-pill ml-1 ml-lg-3 d-flex align-items-center"
              style={{
                overflow: 'scroll',
                whiteSpace: 'nowrap',
              }}
              target="_blank"
            >
              <div>
                <FiBarChart2 fontSize="25px" />
              </div>
              <h4 className="font-weight-normal mb-0 ml-1">{id}</h4>
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Footer;
