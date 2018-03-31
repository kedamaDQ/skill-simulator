import { combineReducers } from 'redux';
import skill_simulator from './skill_simulator';
import jobs from './jobs';
import weapons from './weapons';
import skill_lines from './skill_lines';
import indices from './indices';
import preset_points from './preset_points';
import owned_points from './owned_points';
import assigned_points from './assigned_points';
import modal from './modal';

const skillSimulatorApp = combineReducers({
  skill_simulator,
  jobs,
  weapons,
  skill_lines,
  indices,
  preset_points,
  owned_points,
  assigned_points,
  modal,
});

export default skillSimulatorApp;
