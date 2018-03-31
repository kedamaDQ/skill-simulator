import {
  INITIALSTATE_FETCH_REQUEST,
  INITIALSTATE_FETCH_SUCCESS,
  INITIALSTATE_FETCH_FAIL,
} from '../actions/skill_simulator';

const skill_simulator = (state = {isFetching: true}, action) => {
  switch(action.type) {
    case INITIALSTATE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case INITIALSTATE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      };

    case INITIALSTATE_FETCH_FAIL:
      console.log(action.error);
      return {
        ...state,
        isFetching: false
      }

    default:
      return state;
  }
};

export default skill_simulator;
