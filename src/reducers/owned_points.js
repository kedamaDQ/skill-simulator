import {
  INITIALIZE_OWNEDPOINTS,
  UPDATE_OWNEDPOINTS,
  UPDATE_OWNEDPOINTS_BULKED,
  LOAD_OWNEDPOINTS
} from '../actions/owned_points';

const initialState = {
  jobId: {
    by_level: 0,
    by_training: 0,
    by_skillbooks: 0,
    nsp: 0,
    msp: 0
  }
};

const buildOwnedPoints = (before, update) => {
  const updated = {
    by_level: update.by_level || before.by_level,
    by_training: update.by_training || before.by_training,
    by_skillbooks: update.by_skillbooks|| before.by_skillbooks
  };
  updated.nsp = updated.by_level.value + updated.by_training.value;
  updated.msp = updated.by_skillbooks.value;
  updated.total = updated.nsp + updated.msp;

  return updated;
};

const updateOwnedPointsBulked = (state, { update, jobs, presets }) => {
  const newState = {};
  for (const jobId in state) {
    if (jobId === 'bulk_setup') {
      newState[jobId] = buildOwnedPoints(state[jobId], update);
      continue;
    }

    for (const target in update) {
      const targetPresets = presets[target][jobs[jobId][`presets_${target}`]]
      const idx = targetPresets.findIndex((tp) => {
        return (update[target].label === tp.label);
      });

      newState[jobId] = buildOwnedPoints(
        state[jobId],
        {
          [target]: (idx < 0) ? targetPresets[targetPresets.length - 1] : targetPresets[idx]
        }
      );
    }
  }
  return newState;
};

const loadOwnedPoints = (state, { loaded }) => {
  const newState = {};
  for (const jobId in state) {
    newState[jobId] = (loaded[jobId]) ? loaded[jobId] : state[jobId];
  }
  return newState;
};

const owned_points = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_OWNEDPOINTS:
      const { indices, jobs, presets, preOwnedDatas } = action;
      const presetLength = Object.keys(presets).length;
      const owned = {};
      if (preOwnedDatas.length && preOwnedDatas.length % presetLength === 0) {
        indices.jobs.forEach((jobId, idx) => {
          const job = jobs[jobId];
          const offset = presetLength * idx;
          const [
            byLevel,
            byTraining,
            bySkillbooks
          ] = preOwnedDatas.slice(offset, offset + presetLength);

          const p_by_level = presets.by_level[job.presets_by_level];
          const p_by_training = presets.by_training[job.presets_by_training];
          const p_by_skillbooks = presets.by_skillbooks[job.presets_by_skillbooks];

          owned[jobId] = {
            by_level: (p_by_level.length > byLevel) ? p_by_level[byLevel] : p_by_level[p_by_level.length - 1],
            by_training: (p_by_training.length > byTraining) ? p_by_training[byTraining] : p_by_training[p_by_training.length - 1],
            by_skillbooks: (p_by_skillbooks.length > bySkillbooks) ? p_by_skillbooks[bySkillbooks] : p_by_skillbooks[p_by_skillbooks.length - 1],
          }
          owned[jobId].nsp = owned[jobId].by_level.value + owned[jobId].by_training.value;
          owned[jobId].msp = owned[jobId].by_skillbooks.value;
          owned[jobId].total = owned[jobId].nsp + owned[jobId].msp;
        });
      } else {
        indices.jobs.forEach((jobId) => {
          const job = jobs[jobId];
          owned[jobId] = {
            by_level: presets.by_level[job.presets_by_level][0],
            by_training: presets.by_training[job.presets_by_training][0],
            by_skillbooks: presets.by_skillbooks[job.presets_by_skillbooks][0],
            nsp: 0,
            msp: 0,
            total: 0
          }
        });
      }
      return {
        ...owned,
        bulk_setup: {
          by_level: presets.by_level["standard"][0],
          by_training: presets.by_training["standard"][0],
          by_skillbooks: presets.by_skillbooks["standard"][0]
        }
      };

    case UPDATE_OWNEDPOINTS:
      const target = Object.assign({}, state[action.jobId]);
      return {
        ...state,
        [action.jobId]: buildOwnedPoints(target, action.update)
      };

    case UPDATE_OWNEDPOINTS_BULKED:
      return updateOwnedPointsBulked(state, action);

    case LOAD_OWNEDPOINTS:
      return loadOwnedPoints(state, action);

    default:
      return state;
  }
}

export default owned_points;
