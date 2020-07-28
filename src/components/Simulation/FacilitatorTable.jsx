import React, { useMemo } from 'react';

import SystemRelatedActions from './SystemRelatedActions';
import BudgetItems from './BudgetItems';
import InjectsAndResponses from './Injections/InjectsAndResponses';
import { SimulationTabs } from '../../constants';

const FacilitatorTable = ({ activeTab }) => {
  const isHq = useMemo(
    () => activeTab === SimulationTabs.CAMPAIGN_HQ,
    [activeTab],
  );
  return (
    <>
      <InjectsAndResponses
        className="my-5"
        location={isHq ? 'hq' : 'local'}
      />
      <BudgetItems
        className="my-5"
        location={isHq ? 'hq' : 'local'}
      />
      <SystemRelatedActions
        className="my-5 pb-5"
        location={isHq ? 'hq' : 'local'}
      />
    </>
  );
};

export default FacilitatorTable;
