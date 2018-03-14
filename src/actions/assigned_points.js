export const INITIALIZE_ASSIGNEDPOINTS = 'INITIALIZE_ASSIGNEDPOINTS';
export const UPDATE_ASSIGNEDPOINTS = 'UPDATE_ASSIGNEDPOINTS';
export const FULLFILL_FOR_PASSIVES = 'FULLFILL_FOR_PASSIVES';
export const RESET_SKILLS = 'RESET_SKILLS';

export const initializeAssignedPoints = (jobs) => {
  return {
    type: INITIALIZE_ASSIGNEDPOINTS,
    jobs
  };
};

export const updateAssignedPoints = (jobId, skillLineId, assigned) => {
  return {
    type: UPDATE_ASSIGNEDPOINTS,
    jobId,
    skillLineId,
    assigned
  };
};

export const fullfillForPassives = (fillings) => {
  return {
    type: FULLFILL_FOR_PASSIVES,
    fillings
  };
};

export const resetSkills = (skillLineIds) => {
  return {
    type: RESET_SKILLS,
    skillLineIds
  };
};
