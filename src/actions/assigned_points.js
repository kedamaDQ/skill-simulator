export const INITIALIZE_ASSIGNED = 'INITIALIZE_ASSIGNED';
export const RESET_ASSIGNED = 'RESET_ASSIGNED';
export const FULLFILL_FOR_PASSIVES = 'FULLFILL_FOR_PASSIVES';
export const LOAD_ASSIGNED = 'LOAD_ASSIGNED';
export const UPDATE_ASSIGNED = 'UPDATE_ASSIGNED';

export const ASSIGNABLE_MIN_NSP = 0;
export const ASSIGNABLE_MAX_NSP = 255;
export const ASSIGNABLE_MIN_MSP = 0;
export const ASSIGNABLE_MAX_MSP = 63;

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

export const resetAssigned = (skillLineIds) => {
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

export const loadAssigned = (details) => {
  return {
    type: LOAD_ASSIGNED,
    details
  };
}

export const updateAssigned = (jobId, skillLineId, ownerJobs, assigned) => {
  return {
    type: UPDATE_ASSIGNED,
    jobId,
    skillLineId,
    ownerJobs,
    assigned
  };
};

export const addNsp = (jobId, skillLineId, addend) => {
  return (dispatch, getState) => {
    const ownerJobs = getState().skill_simulator.skill_lines[skillLineId].owner_jobs;
    const newAssigned = {
      nsp: getState().assigned_points.details[jobId][skillLineId].nsp + addend
    };
    if (newAssigned.nsp < ASSIGNABLE_MIN_NSP) {
      newAssigned.nsp = ASSIGNABLE_MIN_NSP;
    } else if (newAssigned.nsp > ASSIGNABLE_MAX_NSP) {
      newAssigned.nsp = ASSIGNABLE_MAX_NSP;
    }
    dispatch(updateAssigned(jobId, skillLineId, ownerJobs, newAssigned));
  };
};

export const assignNsp = (jobId, skillLineId, nsp) => {
  return (dispatch, getState) => {
    const ownerJobs = getState().skill_simulator.skill_lines[skillLineId].owner_jobs;
    const newAssigned = {
      nsp: nsp
    };
    if (newAssigned.nsp < ASSIGNABLE_MIN_NSP) {
      newAssigned.nsp = ASSIGNABLE_MIN_NSP;
    } else if (newAssigned.nsp > ASSIGNABLE_MAX_NSP) {
      newAssigned.nsp = ASSIGNABLE_MAX_NSP;
    }
    dispatch(updateAssigned(jobId, skillLineId, ownerJobs, newAssigned));
  };
};

export const assignMinNsp = (jobId, skillLineId) => {
  return assignNsp(jobId, skillLineId, ASSIGNABLE_MIN_NSP);
};

export const assignMaxNsp = (jobId, skillLineId) => {
  return (dispatch, getState) => {
    const ownerJobs = getState().skill_simulator.skill_lines[skillLineId].owner_jobs;
    const max = getState().skill_simulator.skill_lines[skillLineId].max_points;
    const assignedByJob = getState().assigned_points.details[jobId][skillLineId].nsp;
    const remainedForJob =
      getState().owned_points[jobId].nsp -
      getState().assigned_points.summaries[jobId].nsp;
    const totalAssigned =
      getState().assigned_points.summaries[skillLineId].nsp +
      getState().assigned_points.details[jobId][skillLineId].msp

    const newAssigned = { nsp: 0 };

    if (remainedForJob > 0) {
      newAssigned.nsp = (totalAssigned + remainedForJob > max) ?
        assignedByJob + (max - totalAssigned) :
        assignedByJob + remainedForJob;
    } else {
      newAssigned.nsp = (totalAssigned > max) ?
        max - (totalAssigned - assignedByJob) :
        assignedByJob + remainedForJob;
      if (newAssigned.nsp < ASSIGNABLE_MIN_NSP) {
        newAssigned.nsp = ASSIGNABLE_MIN_NSP;
      }
    }
    dispatch(updateAssigned(jobId, skillLineId, ownerJobs, newAssigned));
  };
};

export const addMsp = (jobId, skillLineId, addend) => {
  return (dispatch, getState) => {
    const ownerJobs = getState().skill_simulator.skill_lines[skillLineId].owner_jobs;
    const max = getState().skill_simulator.skill_lines[skillLineId].max_points;
    const assignedByJob = getState().assigned_points.details[jobId][skillLineId];
    const totalAssignedForSkill = getState().assigned_points.summaries[skillLineId].nsp;
    const remainedForJob =
      getState().owned_points[jobId].msp -
      getState().assigned_points.summaries[jobId].msp;

    const newAssigned = (addend > remainedForJob) ?
      { msp: assignedByJob.msp + remainedForJob } :
      { msp: assignedByJob.msp + addend };

    const preTotalAssigned = totalAssignedForSkill + newAssigned.msp;
    if (preTotalAssigned > max) {
      if (assignedByJob.nsp < preTotalAssigned - max) {
        newAssigned.nsp = 0;
        newAssigned.msp = max - totalAssignedForSkill;
      } else {
        newAssigned.nsp = assignedByJob.nsp - (preTotalAssigned - max);
      }
    }

    if (newAssigned.msp < ASSIGNABLE_MIN_MSP) {
      newAssigned.msp = ASSIGNABLE_MIN_MSP;
    }
    dispatch(updateAssigned(jobId, skillLineId, ownerJobs, newAssigned));
  };
};

export const assignMsp = (jobId, skillLineId, msp) => {
  return (dispatch, getState) => {
    const ownerJobs = getState().skill_simulator.skill_lines[skillLineId].owner_jobs;
    const remainedForJob =
      getState().owned_points[jobId].msp -
      getState().assigned_points.summaries[jobId].msp;
    const newAssigned = {
      msp: (msp> remainedForJob) ? remainedForJob : msp 
    }

    if (newAssigned.msp < ASSIGNABLE_MIN_MSP) {
      newAssigned.msp = ASSIGNABLE_MIN_MSP;
    } else if (newAssigned.msp > ASSIGNABLE_MAX_MSP) {
      newAssigned.msp = ASSIGNABLE_MAX_MSP;
    }
    dispatch(updateAssigned(jobId, skillLineId, ownerJobs, newAssigned));
  };
};

export const assignMinMsp = (jobId, skillLineId) => {
  return assignMsp(jobId, skillLineId, ASSIGNABLE_MIN_MSP);
};

export const assignMaxMsp = (jobId, skillLineId) => {
  return (dispatch, getState) => {
    const remainedForJob =
      getState().owned_points[jobId].msp -
      getState().assigned_points.summaries[jobId].msp;
    if (remainedForJob > 0) {
      dispatch(addMsp(jobId, skillLineId, remainedForJob));
    }
  };
};

