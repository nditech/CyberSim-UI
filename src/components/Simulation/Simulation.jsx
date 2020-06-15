import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import ActionTable from './ActionTable';
import FacilitatorTable from './FacilitatorTable';
import { SimulationTabs } from '../../constants';

const Simulation = () => {
  const [activeTab, setActiveTab] = useState(
    SimulationTabs.ACTION_TABLE,
  );

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid="md" className="mb-5 pb-5">
        {activeTab === SimulationTabs.ACTION_TABLE ? (
          <ActionTable />
        ) : (
          <FacilitatorTable activeTab={activeTab} />
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Simulation;
