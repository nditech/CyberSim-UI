import React, { useMemo } from 'react';
import { view } from '@risingstack/react-easy-state';

import { logTypes } from './EventLogs';
import BudgetItemLog from './BudgetItemLog';
import CampaignActionLog from './CampaignActionLog';
import CurveballEventLog from './CurveballEventLog';
import SystemRestoreLog from './SystemRestoreLog';
import Log from './Log';
import InjectionBody from '../Simulation/Injections/InjectionBody';
import { msToMinutesSeconds } from '../../util';

const EventLogSwitch = view(
  ({
    log: {
      game_timer,
      descripition,
      type,
      mitigation_type,
      mitigation_id,
      response_id,
      action_id,
      curveball_id,
      injection,
      gameInjection,
    },
    filter,
  }) => {
    const shouldDisplay = useMemo(() => filter[type] || false, [
      filter,
      type,
    ]);

    const eventLog = useMemo(() => {
      switch (type) {
        case logTypes.BudgetItem:
          return (
            <BudgetItemLog
              game_timer={game_timer}
              type={type}
              mitigation_type={mitigation_type}
              mitigation_id={mitigation_id}
            />
          );
        case logTypes.SystemRestore:
          return (
            <SystemRestoreLog
              game_timer={game_timer}
              type={type}
              response_id={response_id}
            />
          );
        case logTypes.CampaignAction:
          return (
            <CampaignActionLog
              game_timer={game_timer}
              type={type}
              action_id={action_id}
            />
          );
        case logTypes.CurveballEvent:
          return (
            <CurveballEventLog
              game_timer={game_timer}
              type={type}
              curveball_id={curveball_id}
            />
          );
        case logTypes.ThreatInjected:
          return (
            <Log
              title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
                injection.title
              } (${
                injection.type === 'Background' ? 'background - ' : ''
              }available from ${msToMinutesSeconds(
                injection.trigger_time,
              )})`}
            >
              <InjectionBody
                injection={injection}
                gameInjection={gameInjection}
                isBackground={injection.type === 'Background'}
              />
            </Log>
          );
        case logTypes.ThreatPrevented:
          return (
            <Log
              title={`${msToMinutesSeconds(game_timer)} - ${type}: ${
                injection.title
              } ${
                injection.type === 'Background' ? '(background)' : ''
              }`}
            >
              <InjectionBody
                injection={injection}
                prevented
                isBackground={injection.type === 'Background'}
              />
            </Log>
          );
        case logTypes.GameState:
          return (
            <Log
              title={`${msToMinutesSeconds(
                game_timer,
              )} - ${descripition}`}
            />
          );
        default:
          return null;
      }
    }, [
      type,
      game_timer,
      mitigation_type,
      mitigation_id,
      response_id,
      action_id,
      curveball_id,
      injection,
      gameInjection,
      descripition,
    ]);

    return shouldDisplay && eventLog;
  },
);

export default EventLogSwitch;
