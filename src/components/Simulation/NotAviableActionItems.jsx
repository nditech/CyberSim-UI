import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { Row, Col, Container } from 'react-bootstrap';

const NotAviableActionItems = ({ systems, actionList }) => (
  <Container className="p-0 m-0 pl-3">
    <Row className="d-flex align-items-center mb-3">
      <Col>
        <h5 className="m-0 font-weight-bold">NOT AVIABLE ACTIONS:</h5>
      </Col>
    </Row>
    <Row>
      <Col>
        {actionList.length
          ? actionList.map((action) => (
              <Row className="py-1 select-row align-items-center d-flex">
                <Col xs={4}>{action.description}</Col>
                <Col className="justify-content-end d-flex align-items-center">
                  <AiOutlineStop
                    className="text-danger mr-2"
                    fontSize="20px"
                  />
                  {action.unaviable_systems
                    .map((system) => systems[system].name)
                    .join(', ')}
                </Col>
              </Row>
            ))
          : 'All actions are aviable.'}
      </Col>
    </Row>
  </Container>
);

export default NotAviableActionItems;
