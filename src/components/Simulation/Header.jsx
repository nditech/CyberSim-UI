import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { SimulationTabs } from '../../constants';

const Header = ({ activeTab, setActiveTab }) => (
  <div
    className="position-sticky bg-white text-center"
    style={{ top: 0, zIndex: 1 }}
  >
    <Row className="m-0 border-primary border-bottom">
      <Col
        xs={4}
        className={classNames(
          'simulation-menu cursor-pointer border-primary border-right p-0',
          {
            active: activeTab === SimulationTabs.ACTION_TABLE,
          },
        )}
        onClick={() => setActiveTab(SimulationTabs.ACTION_TABLE)}
      >
        <h4 className="my-2 font-weight-normal">ACTION TABLE</h4>
      </Col>
      <Col
        xs={4}
        className={classNames(
          'simulation-menu cursor-pointer border-primary border-right p-0',
          {
            active: activeTab === SimulationTabs.CAMPAIGN_HQ,
          },
        )}
        onClick={() => setActiveTab(SimulationTabs.CAMPAIGN_HQ)}
      >
        <h4 className="my-2 font-weight-normal">Campaign HQ</h4>
      </Col>
      <Col
        xs={4}
        className={classNames('simulation-menu cursor-pointer p-0', {
          active: activeTab === SimulationTabs.LOCAL_BRANCH,
        })}
        onClick={() => setActiveTab(SimulationTabs.LOCAL_BRANCH)}
      >
        <h4 className="my-2 font-weight-normal">Local Branch</h4>
      </Col>
    </Row>
    {activeTab === SimulationTabs.ACTION_TABLE ? (
      <Row className="m-0 border-primary border-bottom">
        <Col
          xs={3}
          className="simulation-menu--small cursor-pointer border-primary border-right p-0"
        >
          <p className="my-1 font-weight-bold">SYSTEMS</p>
        </Col>
        <Col
          xs={6}
          className="simulation-menu--small cursor-pointer border-primary border-right p-0"
        >
          <p className="my-1 font-weight-bold">THREATS</p>
        </Col>
        <Col
          xs={3}
          className="simulation-menu--small cursor-pointer p-0"
        >
          <p className="my-1 font-weight-bold">EVENT LOG</p>
        </Col>
      </Row>
    ) : (
      <Row className="m-0 border-primary border-bottom">
        <Col
          xs={3}
          className="simulation-menu--small cursor-pointer border-primary border-right p-0"
        >
          <p className="my-1 font-weight-bold">INJECTS & RESPONSES</p>
        </Col>
        <Col
          xs={6}
          className="simulation-menu--small cursor-pointer border-primary border-right p-0"
        >
          <p className="my-1 font-weight-bold">
            {activeTab === SimulationTabs.CAMPAIGN_HQ
              ? 'CAMPAIGN ACTIONS'
              : 'LOCAL ACTIONS'}
          </p>
        </Col>
        <Col
          xs={3}
          className="simulation-menu--small cursor-pointer p-0"
        >
          <p className="my-1 font-weight-bold">SECURITY ACTIONS</p>
        </Col>
      </Row>
    )}
  </div>
);

export default Header;
