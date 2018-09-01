export const INITIALIZE_OWNEDPOINTS = 'INITIALIZE_OWNEDPOINTS';
export const UPDATE_OWNEDPOINTS = 'UPDATE_OWNEDPOINTS';
export const UPDATE_OWNEDPOINTS_BULKED = 'UPDATE_OWNEDPOINTS_BULKED';
export const LOAD_OWNEDPOINTS = 'LOAD_OWNEDPOINTS';

export const initializeOwnedPoints = (indices, jobs, presets, preOwnedDatas) => {
  return {
    type: INITIALIZE_OWNEDPOINTS,
    indices,
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
  return (dispatch, getState) => {
    const jobs = getState().skill_simulator.jobs;
    const preset_points = getState().skill_simulator.preset_points;
    dispatch(updateOwnedPointsBulked({by_level: preset}, jobs, preset_points));
  };
};

export const updateBulkSetupForTraining = (preset) => {
  return (dispatch, getState) => {
    const jobs = getState().skill_simulator.jobs;
    const preset_points = getState().skill_simulator.preset_points;
    dispatch(updateOwnedPointsBulked({by_training: preset}, jobs, preset_points));
  };
};

export const updateBulkSetupForSkillbooks = (preset) => {
  return (dispatch, getState) => {
    const jobs = getState().skill_simulator.jobs;
    const preset_points = getState().skill_simulator.preset_points;
    dispatch(updateOwnedPointsBulked({by_skillbooks: preset}, jobs, preset_points));
  };
};

export const updateOwnedPointsBulked = (update, jobs, presets) => {
  return {
    type: UPDATE_OWNEDPOINTS_BULKED,
    update,
    jobs,
    presets
  };
};

export const loadOwnedPoints = (loaded) => {
  return {
    type: LOAD_OWNEDPOINTS,
    loaded
  };
};
