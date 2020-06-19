import React, { useMemo } from 'react';
import { Row, Col, Spinner, Card } from 'react-bootstrap';
import { reduce as _reduce } from 'lodash';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from '../../GameStore';
import { useStaticData } from '../../StaticDataProvider';

const Threats = view(({ className }) => {
  const { mitigations: gameMitigations } = gameStore;
  const { injections } = useStaticData();

  const { threats, notThreats } = useMemo(
    () =>
      injections
        ? _reduce(
            injections,
            (
              acc,
              {
                skipper_mitigation,
                skipper_mitigation_type: skipType,
                title,
                id,
              },
            ) => {
              if (!skipper_mitigation) {
                return acc;
              }
              const localUp =
                gameMitigations[`${skipper_mitigation}_local`];
              const hqUp =
                gameMitigations[`${skipper_mitigation}_hq`];
              if (
                (skipType === 'both' && localUp && hqUp) ||
                (skipType === 'hq' && hqUp) ||
                (skipType === 'local' && localUp)
              ) {
                acc.notThreats.push(title || id);
              } else {
                acc.threats.push(title || id);
              }
              return acc;
            },
            {
              threats: [],
              notThreats: [],
            },
          )
        : {
            threats: [],
            notThreats: [],
          },
    [gameMitigations, injections],
  );

  return (
    <Row className={className} id="threats">
      <Col md={6}>
        <Card className="shadow-sm rounded h-100">
          <Card.Header as="h3">MITIGATED THREATS:</Card.Header>
          <Card.Body
            className="pb-3"
            style={{ maxHeight: '350px', overflowY: 'scroll' }}
          >
            {!!notThreats.length &&
              notThreats.map((name, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center mb-2"
                >
                  <AiOutlineCheck className="mr-2" fontSize="20px" />
                  {name}
                </div>
              ))}
            {!injections && (
              <Col xs={12} className="d-flex justify-content-center">
                <Spinner animation="border" />
              </Col>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="shadow-sm rounded h-100">
          <Card.Header as="h3">NOT MITIGATED THREATS:</Card.Header>
          <Card.Body
            className="pb-3"
            style={{ maxHeight: '350px', overflowY: 'scroll' }}
          >
            {!!threats.length &&
              threats.map((name, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center mb-2"
                >
                  <AiOutlineClose className="mr-2" fontSize="20px" />
                  {name}
                </div>
              ))}
            {!injections && (
              <Col xs={12} className="d-flex justify-content-center">
                <Spinner animation="border" />
              </Col>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
});

export default Threats;
