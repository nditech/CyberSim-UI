import React, { useMemo } from 'react';

import SystemRelatedActions from './SystemRelatedActions';
import BudgetItems from './BudgetItems';
import ActionItems from './ActionItems';
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
      <ActionItems
        className="my-5 p-0"
        location={isHq ? 'hq' : 'local'}
      />
      <BudgetItems
        className="my-5"
        location={isHq ? 'hq' : 'local'}
      />
      <SystemRelatedActions
        className="my-5"
        location={isHq ? 'hq' : 'local'}
      />
    </>
  );
};

export default FacilitatorTable;
