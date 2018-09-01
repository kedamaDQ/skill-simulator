import fetch from 'isomorphic-fetch';
import { baseUrl } from '../utils/env';
import { initializeJobs } from './jobs';
import { initializeWeapons } from './weapons';
import { initializeSkillLines } from './skill_lines';
import { initializePresetPoints } from './preset_points';
import { initializeIndices } from './indices';
import { initializeOwnedPoints } from './owned_points';
import { initializeAssignedPoints } from './assigned_points';

export const INITIALSTATE_FETCH_REQUEST = 'TABLE_FETCH_REQUEST';
export const INITIALSTATE_FETCH_SUCCESS = 'TABLE_FETCH_SUCCESS';
export const INITIALSTATE_FETCH_FAIL    = 'TABLE_FETCH_FAIL';
export const INITIALIZE_SKILL_SIMULATOR = 'INITIALIZE_SKILL_SIMULATOR';

export const fetchInitialStateRequest = () => {
  return {
    type: INITIALSTATE_FETCH_REQUEST
  };
};

export const fetchInitialStateSuccess = () => {
  return {
    type: INITIALSTATE_FETCH_SUCCESS,
  };
};

export const fetchInitialStateFail = (error) => {
  return {
    type: INITIALSTATE_FETCH_FAIL,
    error: error,
  };
};

export const initializeSkillSimulator = (indices, jobs, weapons, skill_lines, preset_points) => {
  return {
    type: INITIALIZE_SKILL_SIMULATOR,
    indices,
    jobs,
    weapons,
    skill_lines,
    preset_points
  };
}

export const fetchInitialState = (preOwnedDatas, preAssignedHeaders, preAssignedDatas) => {
  return((dispatch) => {
    dispatch(fetchInitialStateRequest());

    Promise.all([
      fetchData('indices.json'),
      fetchData('jobs.json'),
      fetchData('weapons.json'),
      fetchData('skill_lines.json'),
      fetchData('preset_points.json')
    ])
    .then((values) => {
      const [
        indices,
        jobs,
        weapons,
        skill_lines,
        preset_points,
      ] = values;
      dispatch(initializeIndices(indices));
      dispatch(initializeJobs(jobs));
      dispatch(initializeWeapons(weapons));
      dispatch(initializeSkillLines(indices, jobs, skill_lines));
      dispatch(initializePresetPoints(preset_points));
      dispatch(initializeSkillSimulator(indices, jobs, weapons, skill_lines, preset_points));
      dispatch(initializeOwnedPoints(indices, jobs, preset_points, preOwnedDatas));
      dispatch(initializeAssignedPoints(indices, jobs, skill_lines, preAssignedHeaders, preAssignedDatas));
      dispatch(fetchInitialStateSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchInitialStateFail(error));
    });
  });
};

const fetchData = async (resource) => {
  return fetch(`${baseUrl()}/${resource}`)
  .then((resp) => {
    return resp.json();
  });
};
