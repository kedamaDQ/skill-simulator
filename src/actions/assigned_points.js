export const INITIALIZE_ASSIGNED = 'INITIALIZE_ASSIGNED';
export const UPDATE_ASSIGNED = 'UPDATE_ASSIGNED';
export const RESET_ASSIGNED = 'RESET_ASSIGNED';
export const FULLFILL_FOR_PASSIVES = 'FULLFILL_FOR_PASSIVES';

export const initializeAssignedPoints = (indices, jobs, skillLines, preAssignedHeaders, preAssignedDatas) => {
  return {
    type: INITIALIZE_ASSIGNED,
    indices,
    jobs,
    skillLines,
    preAssignedHeaders,
    preAssignedDatas
  };
};

export const updateAssigned = (jobId, skillLineId, assigned) => {
  return {
    type: UPDATE_ASSIGNED,
    jobId,
    skillLineId,
    assigned
  };
}

export const resetAssigned= (skillLineIds) => {
  return {
    type: RESET_ASSIGNED,
    skillLineIds
  };
};

export const fullfillForPassives = (fillings) => {
  return {
    type: FULLFILL_FOR_PASSIVES,
    fillings
  };
};
