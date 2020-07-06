import React from 'react';
import { Accordion, Card, Row, Col } from 'react-bootstrap';
import { AiOutlineDown } from 'react-icons/ai';

const Log = ({ children, title }) =>
  children ? (
    <Accordion className="my-4">
      <Card
        className="border-primary injection"
        style={{ borderRadius: '1rem' }}
      >
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className="cursor-pointer border-primary py-3 bg-white"
        >
          <Row className="align-items-center">
            <Col lg={8} xs={7} className="font-weight-bold">
              {title}
            </Col>
            <Col
              lg={4}
              xs={5}
              className="d-flex justify-content-end align-items-center"
            >
              <AiOutlineDown
                className="ml-2 text-primary"
                fontSize="25px"
              />
            </Col>
          </Row>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          {children}
        </Accordion.Collapse>
      </Card>
    </Accordion>
  ) : (
    <Card
      className="border-primary injection my-4"
      style={{ borderRadius: '1rem', overflow: 'hidden' }}
    >
      <Card.Header className="py-3 bg-white border-bottom-0">
        <Row className="align-items-center">
          <Col xs={12} className="font-weight-bold">
            {title}
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );

export default Log;
