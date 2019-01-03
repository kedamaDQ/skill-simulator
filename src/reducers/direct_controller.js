import {
  ACTIVATE_CONTROLLER,
  DEACTIVATE_CONTROLLER,
  DELAY_AUTO_ADDITION,
  START_AUTO_ADDITION,
  STOP_AUTO_ADDITION
} from '../actions/direct_controller';

const initialState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  jobId: '',
  skillLineId: '',
  is_active: false,
  auto_addition_timer: null
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

    case DELAY_AUTO_ADDITION:
      return {
        ...state,
        auto_addition_timer: action.timerId
      };

    case START_AUTO_ADDITION:
      return {
        ...state,
        auto_addition_timer: action.timerId
      };
    
    case STOP_AUTO_ADDITION:
      return {
        ...state,
        auto_addition_timer: null
      };

    default:
      return state;
  }
}

export default direct_controller;
