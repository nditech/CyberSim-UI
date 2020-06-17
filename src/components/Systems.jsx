import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FaFistRaised } from 'react-icons/fa';
import { AiOutlineStop } from 'react-icons/ai';

import { useGame } from './GameProvider';

const Systems = ({ className, withHeader }) => {
  const { systems: gameSystems } = useGame();

  const [systems, setSystems] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/systems`)
      .then(({ data }) => {
        setSystems(data);
      })
      .catch((e) => console.error(e));
  }, [setSystems]);

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
              <FaFistRaised
                className="text-primary"
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
        <Spinner
          animation="border"
          className="position-fixed"
          style={{ left: '50%', top: '50%' }}
        />
      )}
    </Row>
  );
};

export default Systems;
