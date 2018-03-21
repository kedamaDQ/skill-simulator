import {
  INITIALIZE_OWNEDPOINTS,
  UPDATE_OWNEDPOINTS,
  UPDATE_OWNEDPOINTS_BULKED
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

const owned_points = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_OWNEDPOINTS:
      console.log(preOwned);
      const { jobs, presets, preOwned } = action;
      const owned = {};
      if (preOwned && preOwned.length === jobs.length * 3) {
        jobs.forEach((job, idx) => {
          owned[job.id] = {
            by_level: presets.by_level[preOwned[idx * 3]],
            by_training: presets.by_training[preOwned[idx * 3 + 1]],
            by_skillbooks: presets.by_skillbooks[preOwned[idx * 3 + 2]],
          }
          owned[job.id].nsp = owned[job.id].by_level.value + owned[job.id].by_training.value;
          owned[job.id].msp = owned[job.id].by_skillbooks.value;
          owned[job.id].total = owned[job.id].nsp + owned[job.id].msp;
        });
      } else {
        jobs.forEach((job) => {
          owned[job.id] = {
            by_level: {label: 'Lv.1', value: 0},
            by_training: {label: '0個', value: 0},
            by_skillbooks: {label: '0個', value: 0},
            nsp: 0,
            msp: 0,
            total: 0
          }
        });
      }
      return {
        ...owned,
        bulk_setup: {
          by_level: {label: 'Lv.1', value: 0},
          by_training: {label: '0個', value: 0},
          by_skillbooks: {label: '0個', value: 0},
        }
      };

    case UPDATE_OWNEDPOINTS:
      const target = Object.assign({}, state[action.jobId]);
      return {
        ...state,
        [action.jobId]: buildOwnedPoints(target, action.update)
      };

    case UPDATE_OWNEDPOINTS_BULKED:
      const newState = {};
      for (const jobId in state) {
        newState[jobId] = buildOwnedPoints(state[jobId], action.update);
      }
      return newState;

    default:
      return state;
  }
}

export default owned_points;
