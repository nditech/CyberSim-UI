import React from 'react';

import Curveballs from './Curveballs';
import SystemRelatedActions from '../SystemRelatedActions';
import ActionItems from '../ActionItems';
import Systems from '../../Systems';

const ActionTable = () => (
  <>
    <ActionItems className="my-5 p-0" location="hq" />
    <ActionItems className="my-5 p-0 pt-5" location="local" />
    <Curveballs className="my-5" />
    <Systems className="my-5" withHeader />
    <SystemRelatedActions className="my-5 pb-5" />
  </>
);

export default ActionTable;
