import React, { useState, useCallback } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Image,
} from 'react-bootstrap';
import axios from 'axios';

const baseState = {
  password: '',
  apiKey: '',
  tableId: '',
};

export default function Migrate() {
  const [state, setState] = useState(baseState);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onChange = useCallback(
    (ev) => {
      const { name, value } = ev.target;
      setState({ ...state, [name]: value });
      if (errors?.[name]) {
        setErrors({ ...errors, [errors.name]: undefined });
      }
    },
    [state, errors],
  );

  const onSubmit = useCallback(
    async (ev) => {
      try {
        setLoading(true);
        ev.preventDefault();
        ev.stopPropagation();
        await axios.post(
          `${process.env.REACT_APP_API_URL}/migrate`,
          state,
        );
        setValidationError({});
        setErrors({});
        setIsSuccess(true);
      } catch (err) {
        const error = err?.response?.data;
        if (error?.validation) {
          setValidationError(error);
        } else {
          if (error) {
            setErrors(error);
          }
          setValidationError({});
        }
        setIsSuccess(false);
      } finally {
        setLoading(false);
      }
    },
    [state],
  );

  return (
    <Container fluid="md" className="mt-5 pt-5">
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Row className="font-weight-bold">
            <Col>
              <h4>MIGRATE THE DATABASE</h4>
            </Col>
          </Row>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>
                <h5 className="font-weight-normal mb-0">
                  Master password:
                </h5>
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={state.password}
                onChange={onChange}
                autoComplete="off"
                style={{ fontSize: '1.125rem' }}
                isInvalid={errors?.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors?.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h5 className="font-weight-normal mb-0">
                  Airtable API key:
                </h5>
              </Form.Label>
              <Form.Control
                type="password"
                name="apiKey"
                value={state.apiKey}
                onChange={onChange}
                autoComplete="off"
                style={{ fontSize: '1.125rem' }}
                isInvalid={errors?.apiKey}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors?.apiKey}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h5 className="font-weight-normal mb-0">
                  Airtable base id:
                </h5>
              </Form.Label>
              <Form.Control
                type="text"
                name="tableId"
                value={state.tableId}
                onChange={onChange}
                autoComplete="off"
                style={{ fontSize: '1.125rem' }}
                isInvalid={errors?.tableId}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors?.tableId}
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="my-4">
              <Col>
                <Button
                  variant="outline-primary"
                  className="rounded-pill w-100"
                  type="submit"
                  disabled={
                    !state.password ||
                    !state.apiKey ||
                    !state.tableId ||
                    isLoading
                  }
                >
                  <h4 className="font-weight-normal mb-0">
                    {isLoading
                      ? 'Ongoing migration ...'
                      : 'Migrate the Database'}
                  </h4>
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="pt-3">
            {errors?.message && (
              <h3 className="text-danger text-center">
                {errors.message}
              </h3>
            )}
            {isSuccess && (
              <h3 className="text-success text-center">
                The database was sucessfully migrated!
              </h3>
            )}
            {Boolean(validationError.errors?.length) && (
              <>
                <h3 className="text-danger text-center">
                  {validationError.message ??
                    'An unexpected error occured! Please contact the developers to fix it.'}
                </h3>
                <div>
                  {validationError.errors.map((error) => (
                    <Alert
                      variant="danger"
                      dismissible
                      onClose={() =>
                        setValidationError({
                          ...validationError,
                          errors: validationError.errors.filter(
                            (err) => err !== error,
                          ),
                        })
                      }
                    >
                      <Alert.Heading>{error.message}</Alert.Heading>
                      <div className="pre">
                        {JSON.stringify(error.value, null, 2)}
                      </div>
                    </Alert>
                  ))}
                </div>
              </>
            )}
          </div>
          {!isSuccess && (
            <Container fluid="md" className="mt-3 mb-5 lead">
              <h3 className="text-center">Migration guide</h3>
              <Row className="mb-3">
                1. Ask your administrator for the master password and
                enter it into the "Master password" input field.
              </Row>
              <Row className="mb-3">
                2. Go to
                <a
                  href="https://airtable.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mx-1"
                >
                  https://airtable.com/
                </a>
                and log in.
              </Row>
              <Row>
                3. Find your airtable account settings and copy your
                airtable API key into the "Airtable API key" input field.
              </Row>
              <Row className="mb-3 mt-1">
                <Col sm={12} md={4}>
                  <Image
                    fluid
                    src="/api_key.png"
                    alt="Find airtable API key 1."
                  />
                </Col>
                <Col sm={12} md={8}>
                  <Image
                    fluid
                    src="/api_key2.png"
                    alt="Find airtable API key 2."
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                4. Go to your desired airtable base and copy the BASE_ID
                segment from the
                "https://airtable.com/BASE_ID/TABLE_ID/ETC..." page url
                into the "Airtable base id" input field.
              </Row>
              <Row>
                <Col sm={12}>
                  <Image
                    fluid
                    src="/table_id.png"
                    alt="Find airtable table id"
                  />
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}
