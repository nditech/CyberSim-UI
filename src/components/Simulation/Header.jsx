import React from 'react';
import { Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { SimulationTabs } from '../../constants';

const Header = ({ activeTab, setActiveTab }) => (
  <div className="position-sticky bg-white text-center simulation-menu shadow">
    <Row className="m-0 border-primary border-bottom">
      <Col
        xs={4}
        className={classNames(
          'simulation-menu-item cursor-pointer border-primary border-right p-0',
          {
            active: activeTab === SimulationTabs.ACTION_TABLE,
          },
        )}
        onClick={() => setActiveTab(SimulationTabs.ACTION_TABLE)}
      >
        <h5 className="my-2 font-weight-normal">ACTION TABLE</h5>
      </Col>
      <Col
        xs={4}
        className={classNames(
          'simulation-menu-item cursor-pointer border-primary border-right p-0',
          {
            active: activeTab === SimulationTabs.CAMPAIGN_HQ,
          },
        )}
        onClick={() => setActiveTab(SimulationTabs.CAMPAIGN_HQ)}
      >
        <h5 className="my-2 font-weight-normal">Campaign HQ</h5>
      </Col>
      <Col
        xs={4}
        className={classNames(
          'simulation-menu-item cursor-pointer p-0',
          {
            active: activeTab === SimulationTabs.LOCAL_BRANCH,
          },
        )}
        onClick={() => setActiveTab(SimulationTabs.LOCAL_BRANCH)}
      >
        <h5 className="my-2 font-weight-normal">Local Branch</h5>
      </Col>
    </Row>
    <Row className="m-0 border-primary border-bottom">
      {activeTab === SimulationTabs.ACTION_TABLE ? (
        <>
          <Col
            xs={3}
            className="simulation-menu-item--small cursor-pointer border-primary border-right p-0"
            onClick={() =>
              document.querySelector('#systems')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">SYSTEMS</p>
          </Col>
          <Col
            xs={6}
            className="simulation-menu-item--small cursor-pointer border-primary border-right p-0"
            onClick={() =>
              document.querySelector('#threats')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">THREATS</p>
          </Col>
          <Col
            xs={3}
            className="simulation-menu-item--small cursor-pointer p-0"
            onClick={() =>
              document.querySelector('#logs')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">EVENT LOG</p>
          </Col>
        </>
      ) : (
        <>
          <Col
            xs={3}
            className="simulation-menu-item--small cursor-pointer border-primary border-right p-0"
            onClick={() =>
              document.querySelector('#injects')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">
              INJECTS & RESPONSES
            </p>
          </Col>
          <Col
            xs={6}
            className="simulation-menu-item--small cursor-pointer border-primary border-right p-0"
            onClick={() =>
              document.querySelector('#actions')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">
              {activeTab === SimulationTabs.CAMPAIGN_HQ
                ? 'CAMPAIGN ACTIONS'
                : 'LOCAL ACTIONS'}
            </p>
          </Col>
          <Col
            xs={3}
            className="simulation-menu-item--small cursor-pointer p-0"
            onClick={() =>
              document.querySelector('#mitigations')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <p className="my-0 font-weight-bold">SECURITY ACTIONS</p>
          </Col>
        </>
      )}
    </Row>
  </div>
);

export default Header;
