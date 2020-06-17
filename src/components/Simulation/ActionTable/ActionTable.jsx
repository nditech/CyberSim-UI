import React from 'react';

import Threats from './Threats';
import TriggerEvent from './TriggerEvent';
import SystemRelatedActions from '../SystemRelatedActions';
import Systems from '../../Systems';
import EventLog from '../../EventLog';

const ActionTable = () => (
  <>
    <Systems className="mt-5 pt-4" withHeader />
    <SystemRelatedActions className="my-5 py-4" />
    <Threats className="mt-5 pt-4" />
    <TriggerEvent className="mt-5 pt-4" />
    <EventLog className="my-5 py-4" />
  </>
);

export default ActionTable;
