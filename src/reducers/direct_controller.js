import {
  ACTIVATE_CONTROLLER,
  DEACTIVATE_CONTROLLER
} from '../actions/direct_controller';

const initialState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  jobId: '',
  skillLineId: '',
  is_active: false
};

const direct_controller = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_CONTROLLER:
      return {
        ...state,
        top: action.top,
        left: action.left,
        width: action.width,
        height: action.height,
        jobId: action.jobId,
        skillLineId: action.skillLineId,
        is_active: true
      };

    case DEACTIVATE_CONTROLLER:
      return initialState;

    default:
      return state;
  }
}

export default direct_controller;
