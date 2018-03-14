import fetch from 'isomorphic-fetch';
import { initializeJobs } from './jobs';
import { initializeWeapons } from './weapons';
import { initializeSkillLines } from './skill_lines';
import { initializePresetPoints } from './preset_points';
import { initializeOwnedPoints } from './owned_points';
import { initializeAssignedPoints } from './assigned_points';

const BASE_URL=process.env.REACT_APP_BASE_URL.replace(/\/$/, '');

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

export const fetchInitialState = () => {
  return((dispatch) => {
    dispatch(fetchInitialStateRequest());

    Promise.all([
      fetchData('jobs.json'),
      fetchData('weapons.json'),
      fetchData('skill_lines.json'),
      fetchData('preset_points.json')
    ])
    .then((values) => {
      const [jobs, weapons, skillLines, presetPoints] = values;
      dispatch(initializeJobs(jobs));
      dispatch(initializeWeapons(weapons, skillLines));
      dispatch(initializeSkillLines(skillLines));
      dispatch(initializePresetPoints(presetPoints));
      dispatch(initializeAssignedPoints(jobs));
      dispatch(initializeOwnedPoints(jobs));
      dispatch(fetchInitialStateSuccess());
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchInitialStateFail(error));
    });
  });
};

const fetchData = async (resource) => {
  return fetch(`${BASE_URL}/${resource}`)
  .then((resp) => {
    return resp.json();
  });
};
