export const ACTIVATE_CONTROLLER = 'ACTIVATE_CONTROLLER';
export const DEACTIVATE_CONTROLLER = 'DEACTIVATE_CONTROLLER';
export const INCRASE_SELF_ASSIGNED = 'INCRASE_SELF_ASSIGNED';
export const DECRASE_SELF_ASSIGNED = 'DECRASE_SELF_ASSIGNED';

export const activateController = (
  {
    top,
    left,
    width,
    height
  },
  {
    jobId,
    skillLineId,
    ownerJobs,
    selfAssigned
  }
) => {
  return {
    type: ACTIVATE_CONTROLLER,
    top,
    left,
    width,
    height,
    jobId,
    skillLineId,
    ownerJobs,
    initialSelfAssigned: selfAssigned
  };
};

export const deactivateController = () => {
  return {
    type: DEACTIVATE_CONTROLLER
  };
};

export const incraseSelfAssigned = () => {
  return {
    type: INCRASE_SELF_ASSIGNED
  };
};

export const decraseSelfAssigned = () => {
  return {
    type: DECRASE_SELF_ASSIGNED
  };
};
