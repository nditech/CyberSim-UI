import React, { useMemo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { reduce as _reduce, map as _map } from 'lodash';
import { view } from '@risingstack/react-easy-state';

import AviableActionItems from './AviableActionItems';
import NotAviableActionItems from './NotAviableActionItems';
import { gameStore } from '../GameStore';
import { useStaticData } from '../StaticDataProvider';

const ActionItems = view(({ className, location }) => {
  const { systems: gameSystems } = gameStore;
  const { actions, systems } = useStaticData();

  console.log(actions);

  const actionList = useMemo(() => {
    const actionsWithSystems = _map(actions, (action) => {
      action.unaviable_systems = action.required_systems.filter(
        (system) => !gameSystems[system],
      );
      return action;
    });

    return _reduce(
      actionsWithSystems,
      (result, value, key) => {
        if (value.type !== location) return result;

        value.roles.forEach((role) => {
          if (value.unaviable_systems.length === 0) {
            (
              result[role] ||
              (result[role] = { aviable: [], notAviable: [] })
            ).aviable.push(value);
          } else {
            (
              result[role] ||
              (result[role] = { aviable: [], notAviable: [] })
            ).notAviable.push(value);
          }
        });

        return result;
      },
      {},
    );
  }, [actions, gameSystems, location]);

  console.log(actionList);

  return (
    <Container className={`${className} p-0`}>
      {_map(actionList, (value, key) => (
        <div className="my-5">
          <Row>
            <Col>
              <h3 className="border-bottom border-primary">
                {key.toUpperCase()}
              </h3>
            </Col>
          </Row>
          <AviableActionItems
            location={location}
            actionList={value.aviable}
          />
          <NotAviableActionItems
            systems={systems}
            actionList={value.notAviable}
          />
        </div>
      ))}
    </Container>
  );
});

export default ActionItems;
