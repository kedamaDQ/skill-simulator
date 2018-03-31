import {
  INITIALSTATE_FETCH_REQUEST,
  INITIALSTATE_FETCH_SUCCESS,
  INITIALSTATE_FETCH_FAIL,
  INITIALIZE_SKILL_SIMULATOR,
} from '../actions/skill_simulator';

const initialState = {
  is_fetching: true,
  min_assignable_nsp: 0,
  max_assignable_nsp: 255,
  min_assignable_msp: 0,
  max_assignable_msp: 255,
};

const buildSkillLines = ({ indices, jobs, skill_lines }) => {
  const sl = {};
  for (const skillLineId in skill_lines) {
    const skillLine = skill_lines[skillLineId];
    sl[skillLineId] = {
      ...skillLine,
      max_points: skillLine.skills[skillLine.skills.length -1].points,
      owner_jobs: indices.jobs.filter((jobId) => {
        return jobs[jobId].job_skill_lines.concat(
          jobs[jobId].weapon_skill_lines
        ).includes(skillLineId);
      })
    };
  }
  return sl;
};

const skill_simulator = (state = initialState, action) => {
  switch(action.type) {
    case INITIALSTATE_FETCH_REQUEST:
      return {
        ...state,
        is_fetching: true
      };

    case INITIALSTATE_FETCH_SUCCESS:
      return {
        ...state,
        is_fetching: false
      };

    case INITIALSTATE_FETCH_FAIL:
      console.log(action.error);
      return {
        ...state,
        is_fetching: false
      }

    case INITIALIZE_SKILL_SIMULATOR:
      return {
        ...state,
        indices: action.indices,
        jobs: action.jobs,
        weapons: action.weapons,
        skill_lines: buildSkillLines(action),
        preset_points: action.preset_points
      }
    default:
      return state;
  }
};

export default skill_simulator;
