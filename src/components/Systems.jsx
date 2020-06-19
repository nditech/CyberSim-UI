import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AiOutlineStop, AiOutlineCheck } from 'react-icons/ai';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from './GameStore';
import { useStaticData } from './StaticDataProvider';

const Systems = view(({ className, withHeader }) => {
  const { systems: gameSystems } = gameStore;
  const { systems } = useStaticData();

  return (
    <Row className={className} id="systems">
      {withHeader && (
        <Col xs={12}>
          <h3>TECHNICAL SYSTEMS:</h3>
        </Col>
      )}
      {systems ? (
        systems.map((system) => (
          <Col
            xs={6}
            md={4}
            className="d-flex align-items-center mb-4"
            key={system.id}
          >
            {gameSystems[system.id] ? (
              <AiOutlineCheck
                className="text-success"
                fontSize="30px"
              />
            ) : (
              <AiOutlineStop
                className="text-danger"
                fontSize="30px"
              />
            )}
            <h5 className="ml-2 text-uppercase font-weight-normal mb-0">
              {system.name}
            </h5>
          </Col>
        ))
      ) : (
        <Col xs={12} className="d-flex justify-content-center">
          <Spinner animation="border" />
        </Col>
      )}
    </Row>
  );
});

export default Systems;
