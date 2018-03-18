import { INITIALIZE_WEAPONS } from '../actions/weapons';

const initialState = [
  {
    id: '',
    display: '',
    skill_lines: []
  }
]

const weapons = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_WEAPONS:
      return action.weapons;

    default:
      return state;
  }
}

export default weapons;
