import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// import { SocketEvents } from '../constants';

const Preparation = ({ socket, game, setGame }) => {
  return (
    <div>
      <div className="py-5 border-primary border-bottom">
        <Container fluid="md">
          <Row>
            <Col>
              <h3 className="m-0">TOTAL Budget Allocated: $0</h3>
            </Col>
            <Col className="text-right">
              <h3 className="m-0">
                <span className="mr-1">Remaining Budget:</span>
                {game.budget.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Preparation;
