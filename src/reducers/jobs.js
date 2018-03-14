import { INITIALIZE_JOBS } from '../actions/jobs';

const initialState = [
  {
    id: '',
    display: '',
    job_skill_lines: [],
    weapon_skill_lines: []
  }
];

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_JOBS:
      return action.jobs;

    default:
      return state;
  }
}

export default jobs;
