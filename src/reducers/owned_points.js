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

const updateOwnedPointsBulked = (state, { update }) => {
  const newState = {};
  for (const jobId in state) {
    newState[jobId] = buildOwnedPoints(state[jobId], update);
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
      const { indices, presets, preOwnedDatas } = action;
      const presetLength = Object.keys(presets).length;
      const owned = {};
      if (preOwnedDatas.length && preOwnedDatas.length % presetLength === 0) {
        indices.jobs.forEach((jobId, idx) => {
          const offset = presetLength * idx;
          const [
            byLevel,
            byTraining,
            bySkillbooks
          ] = preOwnedDatas.slice(offset, offset + presetLength);

          owned[jobId] = {
            by_level: presets.by_level[byLevel],
            by_training: presets.by_training[byTraining],
            by_skillbooks: presets.by_skillbooks[bySkillbooks],
          }
          owned[jobId].nsp = owned[jobId].by_level.value + owned[jobId].by_training.value;
          owned[jobId].msp = owned[jobId].by_skillbooks.value;
          owned[jobId].total = owned[jobId].nsp + owned[jobId].msp;
        });
      } else {
        indices.jobs.forEach((jobId) => {
          owned[jobId] = {
            by_level: presets.by_level[0],
            by_training: presets.by_training[0],
            by_skillbooks: presets.by_skillbooks[0],
            nsp: 0,
            msp: 0,
            total: 0
          }
        });
      }
      return {
        ...owned,
        bulk_setup: {
          by_level: presets.by_level[0],
          by_training: presets.by_training[0],
          by_skillbooks: presets.by_skillbooks[0]
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
