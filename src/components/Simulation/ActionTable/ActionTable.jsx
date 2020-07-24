import React from 'react';

import Threats from './Threats';
import Curveballs from './Curveballs';
import SystemRelatedActions from '../SystemRelatedActions';
import Systems from '../../Systems';
import EventLogs from '../../EventLogs/EventLogs';

const ActionTable = () => (
  <>
    <Systems className="my-5" withHeader />
    <SystemRelatedActions className="my-5" />
    <Threats className="my-5" />
    <Curveballs className="my-5" />
    <EventLogs className="my-5 pb-5" />
  </>
);

export default ActionTable;
