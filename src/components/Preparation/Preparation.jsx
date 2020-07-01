import React, { useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Nav,
} from 'react-bootstrap';
import { FiBarChart2 } from 'react-icons/fi';
import { reduce as _reduce, map as _map } from 'lodash';
import { view } from '@risingstack/react-easy-state';

import { gameStore } from '../GameStore';
import { useStaticData } from '../StaticDataProvider';
import MitigationCategory from './MitigationCategory';
import { numberToUsd } from '../../util';

const Preparation = view(() => {
  const {
    id,
    budget,
    mitigations: gameMitigations,
    actions: { toggleMitigation, startSimulation },
  } = gameStore;
  const { mitigations } = useStaticData();

  const mitigationsByCategory = useMemo(
    () =>
      _reduce(
        mitigations,
        (categories, item) => ({
          ...categories,
          [item.category]: [
            ...(categories[item.category] || []),
            item,
          ],
        }),
        {},
      ),
    [mitigations],
  );

  const allocatedCategoryBudgets = useMemo(
    () =>
      mitigationsByCategory
        ? _reduce(
            mitigationsByCategory,
            (acc, category, categoryKey) => {
              const categorySum = _reduce(
                category,
                (sum, { id, hq_cost, local_cost }) => {
                  let newSum = sum;
                  if (gameMitigations[`${id}_hq`] && hq_cost) {
                    newSum += hq_cost;
                  }
                  if (gameMitigations[`${id}_local`] && local_cost) {
                    newSum += local_cost;
                  }
                  return newSum;
                },
                0,
              );
              return {
                ...acc,
                [categoryKey]: categorySum,
                sum: (acc.sum || 0) + categorySum,
              };
            },
            {},
          )
        : { sum: 0 },
    [mitigationsByCategory, gameMitigations],
  );

  return (
    <>
      <div
        className="py-3 border-primary border-bottom position-sticky bg-white shadow"
        style={{ top: 0, zIndex: 1 }}
      >
        <Container fluid="md">
          <Row>
            <Col>
              <h3 className="m-0">
                <span className="mr-1">Budget Allocated:</span>
                {numberToUsd(allocatedCategoryBudgets.sum)}
              </h3>
            </Col>
            <Col className="text-right">
              <h3 className="m-0">
                <span className="mr-1">Remaining Budget:</span>
                {numberToUsd(budget)}
              </h3>
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid="md" className="mb-5 pb-5">
        {mitigationsByCategory ? (
          _map(mitigationsByCategory, (category, key) => (
            <MitigationCategory
              key={key}
              name={key}
              mitigations={category}
              gameMitigations={gameMitigations}
              allocatedBudget={allocatedCategoryBudgets[key]}
              toggleMitigation={toggleMitigation}
              budget={budget}
            />
          ))
        ) : (
          <Spinner
            animation="border"
            className="position-fixed"
            style={{ left: '50%', top: '50%' }}
          />
        )}
      </Container>
      <div
        className="py-3 border-primary border-top position-fixed w-100 bg-white shadow-lg"
        style={{ bottom: 0 }}
      >
        <Container fluid="md">
          <Row>
            <Col xs={8}>
              <Button
                variant="outline-primary"
                className="rounded-pill"
                type="button"
                disabled={!mitigationsByCategory}
                onClick={startSimulation}
              >
                <h4 className="font-weight-normal mb-0">
                  SAVE Budget and START Simulation
                </h4>
              </Button>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <Nav.Link
                href={`?gameId=${id}&isProjectorView=true`}
                className="btn btn-outline-primary rounded-pill d-flex align-items-center"
                style={{
                  overflow: 'scroll',
                  whiteSpace: 'nowrap',
                }}
                target="_blank"
              >
                <div>
                  <FiBarChart2 fontSize="25px" />
                </div>
                <h4 className="font-weight-normal mb-0 ml-1">{id}</h4>
              </Nav.Link>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
});

export default Preparation;
