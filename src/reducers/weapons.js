import { INITIALIZE_WEAPONS } from '../actions/weapons';

const initialState = [
  {
    id: '',
    display: '',
    skill_lines: [],
    owner_jobs: []
  }
];

const buildWeapons = ({ weapons, jobs }) => {
  return weapons.map((w) => {
    return {
      ...w,
      owner_jobs: jobs.map((j) => {
        return (j.weapon_skill_lines.includes(w.id)) ? j.id : null;
      }).filter(v => v)
    };
  })
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
