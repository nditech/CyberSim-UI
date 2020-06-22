import React, { useMemo } from 'react';

import SystemRelatedActions from './SystemRelatedActions';
import { SimulationTabs } from '../../constants';

const FacilitatorTable = ({ activeTab }) => {
  const isHq = useMemo(
    () => activeTab === SimulationTabs.CAMPAIGN_HQ,
    [activeTab],
  );
  return (
    <>
      <SystemRelatedActions
        className="my-5 py-4"
        location={isHq ? 'hq' : 'local'}
      />
    </>
  );
};

export default FacilitatorTable;
