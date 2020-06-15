import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import { SimulationTabs } from '../../constants';

const Preparation = ({ socket, game }) => {
  const [activeTab, setActiveTab] = useState(
    SimulationTabs.ACTION_TABLE,
  );

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid="md" className="mb-5 pb-5">
        TODO: SIMULATION CONTENT
      </Container>
      <Footer socket={socket} game={game} />
    </div>
  );
};

export default Preparation;
