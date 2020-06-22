import React, { useMemo } from 'react';

import SystemRelatedActions from './SystemRelatedActions';
import BudgetItems from './BudgetItems';
import { SimulationTabs } from '../../constants';

const FacilitatorTable = ({ activeTab }) => {
  const isHq = useMemo(
    () => activeTab === SimulationTabs.CAMPAIGN_HQ,
    [activeTab],
  );
  return (
    <>
      <BudgetItems
        className="my-5 py-4"
        location={isHq ? 'hq' : 'local'}
      />
      <SystemRelatedActions
        className="my-5 py-4"
        location={isHq ? 'hq' : 'local'}
      />
    </>
  );
};

export default FacilitatorTable;
