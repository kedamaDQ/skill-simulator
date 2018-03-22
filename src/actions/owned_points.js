export const INITIALIZE_OWNEDPOINTS = 'INITIALIZE_OWNEDPOINTS';
export const UPDATE_OWNEDPOINTS = 'UPDATE_OWNEDPOINTS';
export const UPDATE_OWNEDPOINTS_BULKED = 'UPDATE_OWNEDPOINTS_BULKED';

export const initializeOwnedPoints = (jobs, presets, preOwnedDatas) => {
  return {
    type: INITIALIZE_OWNEDPOINTS,
    jobs,
    presets,
    preOwnedDatas
  };
};

export const updateOwnedPointsByLevel = (jobId, preset) => {
  return {
    type: UPDATE_OWNEDPOINTS,
    jobId,
    update: {
      by_level: preset
    }
  };
};

export const updateOwnedPointsByTraining = (jobId, preset) => {
  return {
    type: UPDATE_OWNEDPOINTS,
    jobId,
    update: {
      by_training: preset
    }
  };
};

export const updateOwnedPointsBySkillbooks = (jobId, preset) => {
  return {
    type: UPDATE_OWNEDPOINTS,
    jobId,
    update: {
      by_skillbooks: preset
    }
  };
};

export const updateBulkSetupForLevel = (preset) => {
  return {
    type: UPDATE_OWNEDPOINTS_BULKED,
    update: {
      by_level: preset
    }
  };
};

export const updateBulkSetupForTraining = (preset) => {
  return {
    type: UPDATE_OWNEDPOINTS_BULKED,
    update: {
      by_training: preset
    }
  };
};

export const updateBulkSetupForSkillbooks = (preset) => {
  return {
    type: UPDATE_OWNEDPOINTS_BULKED,
    update: {
      by_skillbooks: preset
    }
  };
};
