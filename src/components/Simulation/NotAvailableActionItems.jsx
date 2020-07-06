import React from 'react';
import { AiOutlineStop } from 'react-icons/ai';
import { Row, Col, Container } from 'react-bootstrap';

const NotAvailableActionItems = ({ systems, actionList, role }) => (
  <Container className="p-0 m-0 pl-3">
    <Row className="d-flex align-items-center mb-3">
      <Col>
        <h5 className="m-0 font-weight-bold">
          NOT AVAILABLE ACTIONS:
        </h5>
      </Col>
    </Row>

    {actionList.length
      ? actionList.map((action) => (
          <Row
            className="py-1 select-row align-items-center d-flex"
            key={`${role}_${action.id}`}
          >
            <Col xs={4}>{action.description}</Col>
            <Col className="justify-content-end d-flex align-items-center">
              <AiOutlineStop
                className="text-danger mr-2"
                fontSize="20px"
              />
              {action.unavailableSystems
                .map((system) => systems[system].name)
                .join(', ')}
            </Col>
          </Row>
        ))
      : 'All actions are available.'}
  </Container>
);

export default NotAvailableActionItems;
