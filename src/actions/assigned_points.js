export const INITIALIZE_ASSIGNED = 'INITIALIZE_ASSIGNED';
export const UPDATE_ASSIGNED = 'UPDATE_ASSIGNED';
export const RESET_ASSIGNED = 'RESET_ASSIGNED';
export const FULLFILL_FOR_PASSIVES = 'FULLFILL_FOR_PASSIVES';
export const LOAD_ASSIGNED = 'LOAD_ASSIGNED';

export const ASSIGNABLE_MIN_VALUE = 0;
export const ASSIGNABLE_MAX_VALUE = 255;

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

export const updateAssigned = (jobId, skillLineId, ownerJobs, assigned) => {
  return {
    type: UPDATE_ASSIGNED,
    jobId,
    skillLineId,
    ownerJobs,
    assigned
  };
}
export const assignMinNsp = ({ jobId, skillLineId, ownerJobs }) => {
  return updateAssigned(jobId, skillLineId, ownerJobs, { nsp: 0 });
};

export const assignMaxNsp = ({
  jobId,
  skillLineId,
  ownerJobs,
  skillLineMax,
  selfAssigned,
  skillTotalAssigned,
  jobOwned,
  jobAssigned
}) => {
  const jobRemained = {
    nsp: jobOwned.nsp - jobAssigned.nsp
  };
  const totalAssigned = skillTotalAssigned.nsp + selfAssigned.msp;
  const assigned = {};
  if (jobRemained.nsp > 0) {
    const preTotalAssigned = totalAssigned + jobRemained.nsp;
    if (preTotalAssigned > skillLineMax) {
      assigned.nsp = selfAssigned.nsp + (skillLineMax - totalAssigned);
    } else {
      assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
    }
  } else {
    if (totalAssigned > skillLineMax) {
      assigned.nsp = skillLineMax- (totalAssigned - selfAssigned.nsp);
    } else {
      assigned.nsp = selfAssigned.nsp + jobRemained.nsp;
    }
    if (assigned.nsp < 0) {
      assigned.nsp = 0;
    }
  }
  return updateAssigned(jobId, skillLineId, ownerJobs, assigned);
};

export const assignNsp = (
  {
    jobId,
    skillLineId,
    ownerJobs,
    selfAssigned
  },
  addend
) => {
  const assigned = {
    nsp: selfAssigned.nsp + addend
  };
  if (assigned.nsp < ASSIGNABLE_MIN_VALUE) {
    assigned.nsp = ASSIGNABLE_MIN_VALUE;
  } else if (assigned.nsp > ASSIGNABLE_MAX_VALUE) {
    assigned.nsp = ASSIGNABLE_MAX_VALUE;
  }
  return updateAssigned(jobId, skillLineId, ownerJobs, assigned);
};

export const assignMinMsp = ({ jobId, skillLineId, ownerJobs }) => {
  return updateAssigned(jobId, skillLineId, ownerJobs, { msp: 0 });
};

export const assignMaxMsp = ({
  jobId,
  skillLineId,
  ownerJobs,
  skillLineMax,
  selfAssigned,
  skillTotalAssigned,
  jobOwned,
  jobAssigned
}) => {
  const jobRemained = {
    msp: jobOwned.msp - jobAssigned.msp
  };
  const assigned = {};
  if (jobRemained.msp > 0) {
    const preTotalAssigned = skillTotalAssigned.nsp + selfAssigned.msp + jobRemained.msp;
    if (preTotalAssigned <= skillLineMax) {
      assigned.msp = selfAssigned.msp + jobRemained.msp;
    } else {
      if (selfAssigned.nsp >= preTotalAssigned - skillLineMax) {
        assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLineMax);
        assigned.msp = selfAssigned.msp + jobRemained.msp;
      } else {
        assigned.nsp = 0;
        assigned.msp = selfAssigned.msp + (skillLineMax- skillTotalAssigned.nsp);
      }
    }
  } else {
    assigned.msp = selfAssigned.msp;
  }
  return updateAssigned(jobId, skillLineId, ownerJobs, assigned);
};

export const assignMsp = (
  {
    jobId,
    skillLineId,
    ownerJobs,
    skillLineMax,
    selfAssigned,
    skillTotalAssigned,
    jobOwned,
    jobAssigned
  },
  addend
) => {
  const jobRemained = {
    msp: jobOwned.msp - jobAssigned.msp
  };
  const assigned = {};
  if (addend > jobRemained.msp) {
    assigned.msp = selfAssigned.msp + jobRemained.msp;
  } else {
    assigned.msp = selfAssigned.msp + addend;
  }

  const preTotalAssigned = skillTotalAssigned.nsp + assigned.msp;
  if (preTotalAssigned > skillLineMax) {
    if (selfAssigned.nsp >= preTotalAssigned - skillLineMax) {
      assigned.nsp = selfAssigned.nsp - (preTotalAssigned - skillLineMax);
    } else {
      assigned.nsp = 0;
      assigned.msp = skillLineMax- skillTotalAssigned;
    }
  }
  if (assigned.msp < 0) {
    assigned.msp = 0;
  }
  return updateAssigned(jobId, skillLineId, ownerJobs, assigned);
};


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

export const loadAssigned = (details) => {
  return {
    type: LOAD_ASSIGNED,
    details
  };
}
