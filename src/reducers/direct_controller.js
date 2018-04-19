import {
  ACTIVATE_CONTROLLER,
  DEACTIVATE_CONTROLLER,
  INCRASE_SELF_ASSIGNED,
  DECRASE_SELF_ASSIGNED
} from '../actions/direct_controller';

const initialState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  jobId: '',
  skillLineId: '',
  ownerJobs: [],
  selfAssigned: 0,
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
        ownerJobs: action.ownerJobs,
        selfAssigned: action.initialSelfAssigned,
        is_active: true
      };

    case DEACTIVATE_CONTROLLER:
      return initialState;

    case INCRASE_SELF_ASSIGNED:
      return {
        ...state,
        selfAssigned: state.selfAssigned + 1
      };
    
    case DECRASE_SELF_ASSIGNED:
      return {
        ...state,
        selfAssigned: state.selfAssigned - 1
      };

    default:
      return state;
  }
}

export default direct_controller;
