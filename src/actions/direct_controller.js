export const ACTIVATE_CONTROLLER = 'ACTIVATE_CONTROLLER';
export const DEACTIVATE_CONTROLLER = 'DEACTIVATE_CONTROLLER';
export const DELAY_AUTO_ADDITION = 'DELAY_AUTO_ADDITION';
export const START_AUTO_ADDITION = 'START_AUTO_ADDITION';
export const STOP_AUTO_ADDITION = 'STOP_AUTO_ADDITION';

export const activateController = (
  {
    top,
    left,
    width,
    height
  },
  jobId,
  skillLineId,
) => {
  return {
    type: ACTIVATE_CONTROLLER,
    top,
    left,
    width,
    height,
    jobId,
    skillLineId,
  };
};

export const deactivateController = () => {
  return {
    type: DEACTIVATE_CONTROLLER
  };
};

export const delayAutoAddition = (timerId) => {
  return {
    type: DELAY_AUTO_ADDITION,
    timerId
  }
};

export const startAutoAddition = (timerId) => {
  return {
    type: START_AUTO_ADDITION,
    timerId
  };
};

export const stopAutoAddition = () => {
  return {
    type: STOP_AUTO_ADDITION 
  };
};
