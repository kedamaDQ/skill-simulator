import { INITIALIZE_WEAPONS } from '../actions/weapons';

const initialState = {
  '': {
    display: '',
    skill_lines: [],
    owner_jobs: []
  }
};

const buildWeapons = ({ weapons, jobs, indices }) => {
  const w = {}

  for (const wId in weapons) {
    w[wId] = Object.assign({}, weapons[wId], {
      owner_jobs: indices.jobs.map((jId) => {
        return (jobs[jId].weapon_skill_lines.includes(wId)) ? jId : null;
      }).filter(v => v)
    });
  }
  return w;
};

const weapons = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_WEAPONS:
      return buildWeapons(action);

    default:
      return state;
  }
};

export default weapons;
