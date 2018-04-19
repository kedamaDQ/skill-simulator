import { combineReducers } from 'redux';
import skill_simulator from './skill_simulator';
import owned_points from './owned_points';
import assigned_points from './assigned_points';
import modal from './modal';
import filter from './filter';
import direct_controller from './direct_controller';

const skillSimulatorApp = combineReducers({
  skill_simulator,
  owned_points,
  assigned_points,
  modal,
  filter,
  direct_controller
});

export default skillSimulatorApp;
