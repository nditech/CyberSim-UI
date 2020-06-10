import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

// import { SocketEvents } from '../constants';

const Preparation = ({ socket, game, setGame }) => {
  const [
    mitigationsByCategory,
    setMitigationsByCategory,
  ] = useState();

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
      <div className="py-5 border-primary border-bottom">
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
      <div className="py-5 border-primary border-bottom">
        <Container fluid="md">
          {mitigationsByCategory ? (
            Object.keys(mitigationsByCategory).map((key) => (
              <div key={key}>{key}</div>
            ))
          ) : (
            <Spinner animation="border" />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Preparation;
