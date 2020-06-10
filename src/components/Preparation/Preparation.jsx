import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
} from 'react-bootstrap';

// import { SocketEvents } from '../constants';
import MitigationCategory from './MitigationCategory';

const Preparation = ({ socket, game, setGame }) => {
  const [
    mitigationsByCategory,
    setMitigationsByCategory,
  ] = useState();

  const toggleMitigation = useCallback(({ id, type }) => {
    // TODO:
    console.log('emit socket event for mitigation purchase');
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/mitigations`)
      .then(({ data }) => {
        setMitigationsByCategory(
          data.reduce(
            (categories, item) => ({
              ...categories,
              [item.category]: [
                ...(categories[item.category] || []),
                item,
              ],
            }),
            {},
          ),
        );
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <div
        className="py-4 border-primary border-bottom position-sticky bg-white"
        style={{ top: 0 }}
      >
        <Container fluid="md">
          <Row>
            <Col>
              <h3 className="m-0">
                <span className="mr-1">TOTAL Budget Allocated:</span>
                {game.allocated_budget.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </h3>
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
      <div className="py-5">
        <Container fluid="md">
          {mitigationsByCategory ? (
            Object.keys(mitigationsByCategory).map((key) => (
              <MitigationCategory
                key={key}
                name={key}
                mitigations={mitigationsByCategory[key]}
                game={game}
                toggleMitigation={toggleMitigation}
              />
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </Container>
      </div>
      <div
        className="py-4 border-primary border-top position-fixed bg-white w-100"
        style={{ bottom: 0 }}
      >
        <Container fluid="md">
          <Row>
            <Col md={6}>
              <Button
                variant="outline-primary"
                className="rounded-pill"
                type="button"
                disabled={!mitigationsByCategory}
                onClick={() =>
                  console.log('emit go to simulation status')
                }
              >
                <h4 className="font-weight-normal mb-0">
                  SAVE Budget and START Simulation
                </h4>
              </Button>
            </Col>
            <Col md={6} className="text-right">
              <Button
                variant="outline-primary"
                className="rounded-pill"
                type="button"
                disabled={!mitigationsByCategory}
                onClick={() => console.log('open projector?')}
              >
                <h4 className="font-weight-normal mb-0">{game.id}</h4>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Preparation;
