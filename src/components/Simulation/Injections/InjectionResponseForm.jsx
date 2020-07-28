import React, { useMemo } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { view, store } from '@risingstack/react-easy-state';
import { AiOutlineCheck } from 'react-icons/ai';

import { gameStore } from '../../GameStore';
import { useStaticData } from '../../StaticDataProvider';
import { msToMinutesSeconds } from '../../../util';

const InjectionResponseForm = view(
  ({ injection, disabled, gameInjection }) => {
    const {
      actions: { respondToInjection, nonCorrectRespondToInjection },
      mitigations: gameMitigations,
    } = gameStore;
    const { responses, systems } = useStaticData();

    const formStore = store({
      none: !!(
        gameInjection?.response_made_at &&
        !gameInjection?.correct_responses_made?.length
      ),
      selectedResponses: new Set(
        gameInjection?.correct_responses_made?.length
          ? gameInjection.correct_responses_made
          : [],
      ),
      selectNone: () => {
        formStore.selectedResponses = new Set();
        formStore.none = true;
      },
      submitResponses: () => {
        if (formStore.none) {
          nonCorrectRespondToInjection({
            injectionId: injection.id,
          });
        } else {
          respondToInjection({
            responseIds: [...formStore.selectedResponses],
            injectionId: injection.id,
          });
        }
      },
      get responseCost() {
        return [...formStore.selectedResponses].reduce(
          (acc, id) => acc + responses[id].cost,
          0,
        );
      },
      get restoredSystems() {
        return [...formStore.selectedResponses].reduce(
          (acc, id) =>
            responses[id].systems_to_restore?.length
              ? [
                  ...acc,
                  ...responses[id].systems_to_restore.map(
                    (systemId) => systems[systemId].name,
                  ),
                ]
              : acc,
          [],
        );
      },
    });

    const availableResponses = useMemo(
      () =>
        injection.responses?.filter(
          ({ required_mitigation, required_mitigation_type }) =>
            !required_mitigation_type ||
            !required_mitigation ||
            (required_mitigation_type === 'party'
              ? gameMitigations[`${required_mitigation}_hq`] &&
                gameMitigations[`${required_mitigation}_local`]
              : gameMitigations[
                  `${required_mitigation}_${required_mitigation_type}`
                ]),
        ),
      [injection, gameMitigations],
    );

    return (
      <Row>
        <Col xs={12}>
          {!gameInjection?.response_made_at ? (
            <Row>
              <Col xs={8} lg={9} className="font-weight-bold">
                Select correct responses implemented:
              </Col>
              <Col xs={4} lg={3}>
                <Button
                  variant="outline-primary"
                  className="rounded-pill w-100"
                  type="button"
                  disabled={
                    disabled ||
                    !(
                      formStore.none ||
                      formStore.selectedResponses.size
                    )
                  }
                  onClick={formStore.submitResponses}
                >
                  RESOLVE EVENT
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col xs={12} lg={12} className="font-weight-bold">
                Correct responses implemented (at{' '}
                {msToMinutesSeconds(gameInjection.response_made_at)})
              </Col>
            </Row>
          )}
        </Col>
        <Col xs={12} className="mb-3">
          {availableResponses?.map((response) => (
            <Form.Check
              type="switch"
              className="py-1"
              style={{ width: 'fit-content' }}
              key={`${injection.id}_${response.id}`}
              id={`${injection.id}_${response.id}`}
              label={
                <span>
                  {response.description} (Cost: $
                  {responses[response.id].cost})
                </span>
              }
              disabled={disabled}
              checked={formStore.selectedResponses.has(response.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  formStore.none = false;
                  formStore.selectedResponses.add(response.id);
                } else {
                  formStore.selectedResponses.delete(response.id);
                }
              }}
            />
          ))}
          <Form.Check
            type="switch"
            className="py-1"
            style={{ width: 'fit-content' }}
            id={`${injection.id}_none`}
            label={
              <span>
                {availableResponses?.length
                  ? 'NONE OF THE ABOVE'
                  : 'MARK AS RESPONDED (no correct responses available)'}
              </span>
            }
            disabled={disabled}
            checked={formStore.none}
            onChange={(e) => {
              if (e.target.checked) {
                formStore.selectNone();
              } else {
                formStore.none = false;
              }
            }}
          />
        </Col>
        <Col xs={12} className="my-2 font-weight-bold">
          Effect of implemented responses:
        </Col>
        <Col xs={4}>
          <AiOutlineCheck className="mr-2" fontSize="20px" />$
          {formStore.responseCost} spent
        </Col>
        <Col xs={8}>
          <AiOutlineCheck className="mr-2" fontSize="20px" />
          {formStore.restoredSystems.length
            ? formStore.restoredSystems
            : 'No system restored'}
        </Col>
      </Row>
    );
  },
);

export default InjectionResponseForm;
