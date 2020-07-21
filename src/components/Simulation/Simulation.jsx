import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import ActionTable from './ActionTable/ActionTable';
import FacilitatorTable from './FacilitatorTable';
import { SimulationTabs } from '../../constants';

const Simulation = () => {
  const [activeTab, setActiveTab] = useState(
    SimulationTabs.ACTION_TABLE,
  );

  useEffect(() => {
    document.querySelector('#root').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid="md" className="mb-5 pb-5">
        {activeTab === SimulationTabs.ACTION_TABLE ? (
          <ActionTable />
        ) : (
          <FacilitatorTable activeTab={activeTab} />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Simulation;
