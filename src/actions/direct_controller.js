export const ACTIVATE_CONTROLLER = 'ACTIVATE_CONTROLLER';
export const DEACTIVATE_CONTROLLER = 'DEACTIVATE_CONTROLLER';

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
