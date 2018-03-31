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
        skillLines,
        presetPoints,
      ] = values;
      dispatch(initializeIndices(indices));
      dispatch(initializeJobs(jobs));
      dispatch(initializeWeapons(indices, jobs, weapons));
      dispatch(initializeSkillLines(skillLines));
      dispatch(initializePresetPoints(presetPoints));
      dispatch(initializeOwnedPoints(indices, presetPoints, preOwnedDatas));
      dispatch(initializeAssignedPoints(indices, jobs, skillLines, preAssignedHeaders, preAssignedDatas));
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
