import { combineReducers } from 'redux';

import activeWindowsReducer from './ducks/activeWindows'
import userReducer from './ducks/user';
import agenciesReducer from './ducks/agencies';
import agentsReducer from './ducks/agents';
import notificationsReducer from './ducks/notifications';
import agentScheduleReducer from './ducks/agentSchedule';

const rootReducer = combineReducers({
  activeWindows: activeWindowsReducer,
  user: userReducer,
  agencies: agenciesReducer,
  agents: agentsReducer,
  notifications: notificationsReducer,
  agentSchedule: agentScheduleReducer,
});

export default rootReducer;
