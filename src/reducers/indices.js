import { INITIALIZE_INDICES } from '../actions/indices';

const initialState = {
  jobs: [],
  weapons: [],
  skill_lines: []
};

const indices = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_INDICES:
      return action.indices;

    default:
      return state;
  }
};

export default indices;
